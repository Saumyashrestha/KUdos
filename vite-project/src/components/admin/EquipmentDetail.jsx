import { Link } from 'react-router-dom'

const EquipmentDetail = () => {
    return (
        <div>
            <div className="py-5 flex justify-between items-center">
                {/* text  */}
                <h1 className=" text-xl text-[#387478] font-bold">All Equipments</h1>
                {/* Add Product Button  */}
                <Link to="/addequipment">
                <button className="px-5 py-2 bg-[#a8d4d7] border border-[#387478] rounded-lg">Add Equipment</button>
                </Link>
            </div>

            {/* table  */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border border-collapse sm:border-separate border-gray-500 text-[#4c9da3]" >
                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-gray-500 text-slate-700 bg-slate-100 font-bold fontPara">S.No.</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-gray-500 text-slate-700 bg-slate-100">Equipment Name</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-gray-500 text-slate-700 bg-slate-100">Image</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-gray-500 text-slate-700 bg-slate-100">Date</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-gray-500 text-slate-700 bg-slate-100">Action</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-gray-500 text-slate-700 bg-slate-100">Action</th>
                        </tr>
                        <tr className="text-pink-300">
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-gray-500 stroke-slate-500 text-slate-500 ">
                                1.
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-gray-500 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                {'name'}
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-gray-500 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                                Image
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-gray-500 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                                3rd January 2025
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-gray-500 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                                Edit
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-gray-500 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                                Delete
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EquipmentDetail;
