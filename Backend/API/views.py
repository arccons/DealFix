import os
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, permissions
from API import ViewProcessor as VP

fileStr = f"{__file__.strip(os.getcwd())}"

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def deals(request):
    fnStr = f"{fileStr}::deals"

    retVal = VP.getDeals()
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"error": "Error in VP.getDeals()."})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Deal list received.", "DEAL_LIST": retVal['dealList']})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def updateDeal(request):
    fnStr = f"{fileStr}::updateDeal"

    dealID = request.data['dealID']
    effectiveDate = request.data['effectiveDate']
    closingDate = request.data['closingDate']
    subSector = request.data['subSector']
    isLiquid = request.data['isLiquid']
    retVal = VP.updateDeal(dealID, effectiveDate, closingDate, subSector, isLiquid)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"message": "Error in VP.updateDeal()."})

    retVal = VP.getDeals()
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"message": "Error in VP.getDeals()."})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Deal list received.", "DEAL_LIST": retVal['dealList']})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def mappings(request):
    fnStr = f"{fileStr}::mappings"
    dealID = request.data["dealID"]
    #print(f"dealID = {dealID}")

    retVal = VP.getMappings(dealID)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"error": "Error in VP.getMappings()."})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Mappings list received.", "MAPPING_LIST": retVal['mappingsList']})

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def updateMapping(request):
    fnStr = f"{fileStr}::updateMapping"

    dealID = request.data['deal_id']
    fundName = request.data['fund_name']
    asOfDate = request.data['as_of_date']
    local_cmmt = request.data['local_cmmt']
    is_active = request.data['is_active']
    realized_irr = request.data['realized_irr']
    realized_pnl = request.data['realized_pnl']
    realized_date = request.data['realized_date']
    retVal = VP.updateMapping(dealID, 
                              fundName, 
                              asOfDate, 
                              local_cmmt, 
                              is_active, 
                              realized_irr, 
                              realized_pnl, 
                              realized_date)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"message": "Error in VP.updateMapping()."})

    retVal = VP.getMappings(dealID)
    if not retVal['retVal']:
        Response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response({"message": "Error in VP.getMappings()."})
    else:
        Response.status_code = status.HTTP_200_OK
        return Response({"message": "Mappings list received.", "MAPPING_LIST": retVal['mappingsList']})
