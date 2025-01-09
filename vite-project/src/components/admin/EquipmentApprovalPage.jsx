import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../card/card';
import { CheckCircle, XCircle, Box } from 'lucide-react';

const EquipmentApprovalPage = () => {
  const [equipmentRequests, setEquipmentRequests] = useState([
    {
      id: 1,
      equipmentName: 'Football',
      requesterName: 'Suman Sharma',
      requestedDate: 'Dec 10',
      imageUrl: '/football-banner.png',
      quantity: 2,
      status: 'Pending',
      approvedQuantity: 0,
    },
    {
      id: 2,
      equipmentName: 'Cricket Bat',
      requesterName: 'Ravi Koirala',
      requestedDate: 'Dec 12',
      imageUrl: '/football-banner.png',
      quantity: 1,
      status: 'Pending',
      approvedQuantity: 0,
    },
    {
      id: 3,
      equipmentName: 'Tennis Racket',
      requesterName: 'Nisha Rai',
      requestedDate: 'Dec 14',
      imageUrl: '/football-banner.png',
      quantity: 3,
      status: 'Pending',
      approvedQuantity: 0,
    },
  ]);

  const handleApproval = (id, action, approvedQuantity) => {
    setEquipmentRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === id
          ? { ...request, status: action, approvedQuantity }
          : request
      )
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-semibold text-[#387478] hover:scale-105 transition-all ease-in-out">
          Equipment Requests
        </h1>
        <p className="text-base text-[#387478] hover:text-[#2c5d53] transition-colors mt-2">
          Review and approve the requests below!
        </p>
      </div>
      <div className="space-y-6">
        {equipmentRequests.map((request) => (
          <Card
            key={request.id}
            className="bg-white rounded-lg shadow-lg border border-[#387478] p-4 hover:shadow-xl transition-all"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-[#387478] flex items-center gap-2">
                <Box className="h-6 w-6 text-[#387478]" />
                {request.equipmentName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 bg-[#387478] bg-opacity-10 p-4 rounded-md shadow-md">
                <img
                  src={request.imageUrl}
                  alt={request.equipmentName}
                  className="h-14 w-14 object-cover rounded-full border-2 border-[#387478]"
                />
                <div className="flex flex-col flex-grow">
                  <p className="text-sm text-[#387478] font-medium">Requested By:</p>
                  <p className="text-sm text-[#387478]">{request.requesterName}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-[#387478] font-medium">Requested Date:</p>
                  <p className="text-sm text-[#387478]">{request.requestedDate}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <div>
                  <p className="text-sm text-[#387478] font-medium">Quantity:</p>
                  <p className="text-sm text-[#387478]">{request.quantity} items</p>
                </div>
                <div className="flex gap-4 items-center">
                  {request.status === 'Pending' && (
                    <>
                      <input
                        type="number"
                        min="1"
                        max={request.quantity}
                        value={request.approvedQuantity}
                        onChange={(e) =>
                          setEquipmentRequests(prevRequests =>
                            prevRequests.map(r =>
                              r.id === request.id
                                ? { ...r, approvedQuantity: parseInt(e.target.value) }
                                : r
                            )
                          )
                        }
                        className="w-16 px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#387478] transition-all"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            handleApproval(request.id, 'Approved', request.approvedQuantity)
                          }
                          disabled={request.approvedQuantity === 0}
                          className="px-6 py-2 bg-[#387478] text-white rounded-lg hover:bg-[#2c5d53] transition-all disabled:bg-[#b0d8d0]"
                        >
                          Approve <CheckCircle className="inline h-4 w-4 ml-2" />
                        </button>
                        <button
                          onClick={() => handleApproval(request.id, 'Rejected', 0)}
                          className="px-6 py-2 bg-[#9e4040] text-white rounded-lg hover:bg-[#a34141] transition-all"
                        >
                          Reject <XCircle className="inline h-4 w-4 ml-2" />
                        </button>
                      </div>
                    </>
                  )}
                  {request.status !== 'Pending' && (
                    <button
                      disabled
                      className="px-6 py-2 bg-gray-300 text-white rounded-lg cursor-not-allowed"
                    >
                      Action Completed
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EquipmentApprovalPage;
