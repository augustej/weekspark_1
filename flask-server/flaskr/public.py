from flask import jsonify, Blueprint, request, Response, url_for, redirect
from .model import Activity, Activity_type, User, Invitation, Winner, Group, Vote, groupMembers, Suggested_activities
from . import db
import json, random
from flask_login import login_required, login_user, current_user, logout_user
from sqlalchemy import text


public = Blueprint('public', __name__)

@public.route("/create-new-actvity", methods=["POST"])
def createNewActvity():
    if not (Activity_type.query.all()):
        loadTypes()

    name = request.form.get("activity-name")
    duration = request.form.get("activity-duration")
    transportPrice = request.form.get("transportation-price")
    price = request.form.get("activity-price")
    destination = request.form.get("destination")
    description = request.form.get("activity-description")
    ascend = request.form.get("activity-ascend")
    descend = request.form.get("activity-descend")
    distance = request.form.get("activity-distance")
    imageString = request.form.get("hidden-image-ids")
    type = request.form.get("activity-type")
    typeId = Activity_type.query.filter_by(name=type).first().id
    linkList = request.form.getlist("activity-usefull-link")
    linkListName = request.form.getlist("activity-usefull-link-name")
    links = {}
    lat = request.form.get("lat")
    lng = request.form.get("lng")

    i = 0
    for linkName in linkListName:
        links[linkName]= linkList[i]
        i = i+1

    links = json.dumps(links)
    images = imageString.split(",")
    image = json.dumps(images)

    newActivity = Activity(
        name=name, 
        duration=duration, 
        activity_type_id=typeId,
        activity_price=price,
        transportation_price=transportPrice,
        destination=destination,
        description=description,
        ascend=ascend,
        descend=descend,
        distance=distance,
        images=image,
        usefull_links=links,
        lat=lat,
        lng=lng)
    
    db.session.add(newActivity)
    db.session.commit()

    refer = request.referrer
    urlstringLength = len("add-new-activity")
    homeurl = refer[0:(-urlstringLength)]

    return redirect(homeurl)

@public.route("/scroll")
def allActivities():
    roundNr = int(request.args.get("nr"))
    lat = request.args.get("lat")
    lng = request.args.get("lng")
    limitNr = 9
    offset = limitNr * roundNr

    if lat:
        textExpression = text('SELECT * FROM Activity ORDER BY ((:x - lat) * (:y - lat)) + ((:z - lng) * (:h - lng)) LIMIT :limit OFFSET :offset')
        result = db.session.execute(textExpression, {'x': lat, 'y':lat, 'z':lng, 'h':lng, 'limit':limitNr, 'offset':offset})
        columNames = Activity.__table__.columns
        columnsArray = []
    
        for item in columNames:
            stringValue = str(item)
            columnName = stringValue.split(".")[1]
            columnsArray.append(columnName)
        
        activitiesArray = []

        for activity in result:

            activityDict = {}
            for i in range(len(columnsArray)):
                dictKey = columnsArray[i]
                if dictKey == "images" or dictKey == "usefull_links":
                    stringifiedData = json.loads(activity[i])
                    activityDict[dictKey] = stringifiedData
                elif dictKey == "activity_type_id":
                    activityTypeName = Activity_type.query.filter_by(id=activity[i]).first().name
                    activityDict["type"] = activityTypeName
                else:
                    activityDict[dictKey] = activity[i]
                i+=1
            activitiesArray.append(activityDict)
    else:
        activityObjects = Activity.query.limit(limitNr).offset(roundNr*limitNr).all() 
        activitiesArray = changeActivityObjectsToArray(activityObjects)

    return activitiesArray

@public.route("/get-group-suggestions", methods=['GET'])
def getGroupSuggestions():
    groupID = request.args.get("group")
    suggestedActivitiesObjects = Suggested_activities.query.filter_by(group_id=groupID).all()
    idsArray = []
    for suggestedActivity in suggestedActivitiesObjects:
        activityID = suggestedActivity.activity_id
        if not activityID in idsArray:
            idsArray.append(activityID)
    activitiesObjects = Activity.query.filter(Activity.id.in_(idsArray)).all()
    activities = changeActivityObjectsToArray(activitiesObjects)

    # add the creator of this suggestion:
    for activity in activities:
        creator_ID = Suggested_activities.query.filter_by(activity_id=activity["id"], group_id=groupID).first().creator
        if creator_ID == current_user.id:
            activity['creator'] = True
        else:
            activity['creator'] = False
    # allow suugest only once

    return activities

@public.route("/get-activity")
def getActivity():
    activityId = request.args.get("activityID")

    activityObject = Activity.query.filter_by(id=activityId).all()
    arrayOfOneActivity = changeActivityObjectsToArray(activityObject)
    activity = arrayOfOneActivity[0]
    
    return activity

@public.route("/get-winner-activity")
def getWinner():
    groupId = request.args.get("groupID")
    listToPickTheWinner = []
    allSuggestedActivities = Suggested_activities.query.filter_by(group_id=groupId).all()
    for activity in allSuggestedActivities:
        listToPickTheWinner.append(activity.activity_id)
    allVotedActivities = Vote.query.filter_by(group_id=groupId).all()
    for activity in allVotedActivities:
        listToPickTheWinner.append(activity.activity_id)

    winnerIndex = random.randint(0,(len(listToPickTheWinner)-1))
    winnerActivityId = listToPickTheWinner[winnerIndex]
    
    Winner.query.filter_by(group_id=groupId).delete()
    newWinner = Winner(activity_id=winnerActivityId, group_id=groupId)
    db.session.add(newWinner)

    # delete winner from suggestions
    Suggested_activities.query.filter_by(group_id=groupId, activity_id=winnerActivityId).delete()
    # reset all votes
    Vote.query.filter_by(group_id=groupId).delete()
    db.session.commit()

    return [winnerActivityId]        


@public.route("/home")
def homepage():
    activityObjects = Activity.query.all() 
    responseArray = []
    for activity in activityObjects:
        activityDict = {}
        for key in activity.__dict__:
        
            if key == "images" or key == "usefull_links":
                stringifiedData = json.loads(activity.__dict__[key])
                activityDict[key] = stringifiedData
            elif key == "activity_type_id":
                activityTypeName = Activity_type.query.filter_by(id=activity.__dict__[key]).first().name
                activityDict["type"] = activityTypeName
            else:
                activityDict[key] = activity.__dict__[key]
        del activityDict["_sa_instance_state"]
        responseArray.append(activityDict)

    return responseArray

@public.route("/suggest-activity", methods=["POST"])
def suggestActivity():
    if request.method == "POST":
        data = request.get_json()
        groupID = data['group']
        activityId = data['activity']
        action = data['action']
        isAlreadySuggested = Suggested_activities.query.filter_by(activity_id=activityId, group_id=groupID).first()
        if isAlreadySuggested and action == "suggest":
            return Response("Already in Suggestions", 400)
        if isAlreadySuggested and action == "remove":
            Suggested_activities.query.filter_by(activity_id=activityId, group_id=groupID).delete()
            Vote.query.filter_by(activity_id=activityId, group_id=groupID).delete()
            db.session.commit()
            return "true"
        newSuggestion = Suggested_activities(activity_id=activityId, group_id=groupID, votes=0, creator=current_user.id)
        db.session.add(newSuggestion)
        db.session.commit()
        return Response("Successfully suggested", 200)

@public.route("/send-invitation", methods=["POST"])
def sendInvitation():
    data = request.get_json()
    groupToJoin = data['group']
    emails = data['emails']
    usersNotFound = []
    if groupToJoin == 'new':
        newgroup = Group()
        db.session.add(newgroup)
        db.session.commit()
        groupID = newgroup.id
    else:
        groupID = int(groupToJoin)

    for email in emails:
        invitedUser = User.query.filter_by(email=email).first()
        if not invitedUser == current_user:
            try:
                alreadyInvited = Invitation.query.filter_by(group_id=groupID, receiver_id=invitedUser.id, status="not-confirmed").first()
                if not alreadyInvited:
                    newInvitation = Invitation(group_id=groupID, sender_id=current_user.id, receiver_id=invitedUser.id, status="not-confirmed")
                    db.session.add(newInvitation)
                    db.session.commit()
            except:
                usersNotFound.append(email)
    
    if not len(usersNotFound) == len(emails):
        addToGroup(groupID, current_user.id)
    # if user invited 0 members, and it was creation of a new group
    # => delete new group
    elif len(Group.query.filter_by(id=groupID).first().membersList) == 0:
        Group.query.filter_by(id=groupID).delete()
        db.session.query(groupMembers).filter_by(group=groupID).delete()
        db.session.commit()
    return usersNotFound

@public.route("/get-invitations-and-groups", methods=["GET"])
def getInvitationsAndGroups():
    if request.method == 'GET':
        response = []

        # get new invitations
        invitations = []
        invitationsList = Invitation.query.filter_by(receiver_id=current_user.id).all()
        for invitation in invitationsList:
            inviter = User.query.filter_by(id=invitation.sender_id).first().name
            if invitation.status == 'not-confirmed':
                singleInvitation = {'inviter':inviter, "groupId":invitation.group_id}
                invitations.append(singleInvitation)   
        
        groups = []        
        groupsList = db.session.query(groupMembers).filter_by(user_id = current_user.id).all()
        for group in groupsList:
            groupItem = {}
            groupID = group.group

            # get invited Users (not yet responded)
            invitedUserNames = []
            waitingForResponseOfTheseMembers = Invitation.query.filter_by(group_id=groupID, status='not-confirmed').all()
            for member in waitingForResponseOfTheseMembers:
                name = User.query.filter_by(id=member.receiver_id).first().name
                invitedUserNames.append(name)

            # get members of the group
            groupMembersNames = []
            groupsMembersData = db.session.query(groupMembers).filter_by(group =groupID).all()
            for groupMember in groupsMembersData:
                memberName = User.query.filter_by(id=groupMember.user_id).first().name
                groupMembersNames.append(memberName)
            
            # suggestions made to this group
            suggestionsNr = len(Suggested_activities.query.filter_by(creator=current_user.id, group_id=groupID).all())

            groupItem = {'id' : groupID, 'suggestionsNr':suggestionsNr, 'members' : groupMembersNames, 'waitingToRespond': invitedUserNames}
            groups.append(groupItem)
        

        invitationsDict = {'invitations':invitations}
        groupsDict = {'groups':groups}
        response.append(invitationsDict)
        response.append(groupsDict)
        return response

@public.route("/respond-invitation", methods=["POST"])
def respondInvitation():
    if request.method == 'POST':
        data = request.get_json()
        invitationWasReplied =Invitation.query.filter_by(receiver_id=current_user.id, group_id=data['groupID']).first()
        if data['answer'] == 'join':
            addToGroup(data['groupID'], current_user.id)
            invitationWasReplied.status = 'confirmed'
        else:
            invitationWasReplied.status = 'rejected'
        db.session.add(invitationWasReplied)
        db.session.commit()
        return Response("invitation was responded", 200)


@public.route("/leave-group", methods=["POST"])
def leaveGroup():
    if request.method == 'POST':
        data = request.get_json()
        db.session.query(groupMembers).filter_by(user_id = current_user.id, group=data).delete()
        db.session.commit()
        numberOfLeftMembers =  db.session.query(groupMembers).filter_by(group=data).all()
        if len(numberOfLeftMembers) == 0:
            Group.query.filter_by(id=data).delete()
            Suggested_activities.query.filter_by(group_id=data).delete()
            Invitation.query.filter_by(group_id=data).delete()

        # create new group if user has 0 groups left
        userHasGroups = db.session.query(groupMembers).filter_by(user_id=current_user.id).first()
        if not userHasGroups:
            print("KURIU")
            newgroup = Group()
            db.session.add(newgroup)
            db.session.commit()
            addToGroup(newgroup.id, current_user.id)
        db.session.commit()
    return Response("ok", 200)


@public.route("get-user-votes", methods=["GET"])
def getUserVotes():
    if request.method == 'GET':
        groupID = request.args.get("groupID")

        userVotes = Vote.query.filter_by(user_id=current_user.id, group_id=groupID).all()
        usedVotesNr = len(userVotes)
        votedFor = []
        if userVotes:
            for vote in userVotes:
                activityID = vote.activity_id
                votedFor.append(activityID)
        other_members = []

        groupsMembersData = db.session.query(groupMembers).filter_by(group=groupID).all()
        for groupMember in groupsMembersData:
            if not groupMember.user_id == current_user.id:
                memberName = User.query.filter_by(id=groupMember.user_id).first().name
                memberUsedVotes = len(Vote.query.filter_by(user_id=groupMember.user_id, group_id=groupID).all())
                groupMemberDict = {'member': memberName, "votesUsed": memberUsedVotes}
                other_members.append(groupMemberDict)
        winnerID = Winner.query.filter_by(group_id=groupID).first()
        if winnerID:
            winnerActivityData = Activity.query.filter_by(id=winnerID.activity_id).all()
            winner = changeActivityObjectsToArray(winnerActivityData)
        else:
            winner = []

        votesDict = {"used_votes":usedVotesNr, "winner" : winner, "voted_for":votedFor, "other_members": other_members}
    return votesDict



@public.route("/vote-for-activity", methods=["POST"])
def voteForActivity():
    if request.method=="POST":
        data = request.get_json()
        # Vote or Unvote activity:
        findVote = Vote.query.filter_by(
            activity_id=data['activityID'],
            group_id=data['groupID'],
            user_id=current_user.id).first()
        thisActivity = Suggested_activities.query.filter_by(
            activity_id=data['activityID'],
            group_id=data['groupID']).first()
        if not findVote:
            addVote = Vote(
                activity_id=data['activityID'], 
                group_id=data['groupID'],
                user_id=current_user.id)
            db.session.add(addVote)
            thisActivity.votes += 1
        else:
            Vote.query.filter_by(
            activity_id=data['activityID'],
            group_id=data['groupID'],
            user_id=current_user.id).delete()
            thisActivity.votes -= 1

        db.session.add(thisActivity)
        db.session.commit()

    return "true"

def addToGroup(groupId, memberId):
    alreadyInGroup = db.session.query(groupMembers).filter_by(group=groupId,  user_id=memberId).first()
    if alreadyInGroup:
        return Response("already joined", 200)
    insertStatement = groupMembers.insert().values(group=groupId, user_id=memberId)
    db.session.execute(insertStatement)
    db.session.commit()
    return Response("OK", 200)

# initial one time data load. Hard coded
def loadTypes():
    newActType1 = Activity_type(name="run")
    newActType2 = Activity_type(name="walk")
    newActType3 = Activity_type(name="cycle")
    newActType4 = Activity_type(name="hike")
    newActType5 = Activity_type(name="kayak")
    newActType6 = Activity_type(name="city")
    db.session.add(newActType1)
    db.session.add(newActType2)
    db.session.add(newActType3)
    db.session.add(newActType4)
    db.session.add(newActType5)
    db.session.add(newActType6)
    db.session.commit()
    return


def changeActivityObjectsToArray(activityAll):
    responseArray = []
    for activity in activityAll:
        activityDict = {}
        for key in activity.__dict__:
           
            if key == "images" or key == "usefull_links":
                stringifiedData = json.loads(activity.__dict__[key])
                if stringifiedData == {'':''}:
                    stringifiedData = None
                activityDict[key] = stringifiedData
            elif key == "activity_type_id":
                activityTypeName = Activity_type.query.filter_by(id=activity.__dict__[key]).first().name
                activityDict["type"] = activityTypeName
            else:
                activityDict[key] = activity.__dict__[key]
        del activityDict["_sa_instance_state"]
        responseArray.append(activityDict)
    return responseArray

