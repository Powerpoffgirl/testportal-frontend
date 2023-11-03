import React from "react";

export default function EditDoctorModal({ show, doctorId, handleClose })
{
    console.log("HANDLE SHOW", handleClose)
    // Additional styling or logic can be added here if needed.

    // The modal display style depends on the `show` prop.
    const modalDisplayStyle = show ? "flex" : "hidden";


    return (
        <>
            {/* Modal Background */}
            <div
                className={`${modalDisplayStyle} fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full justify-center items-center`}
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }} // Optional: This adds a semi-transparent backdrop
            >
                {/* Modal Content */}
                <div className="relative w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Close Button */}
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            // onClick={setEditDoctorModalVisible(false)}
                            onClick={handleClose}
                        >
                            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {/* Modal Inner Content */}
                        <div className="p-6 text-center">
                            {/* Add your modal content here */}
                            <p>{doctorId}</p>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this product?
                            </h3>
                            <button
                                type="button"
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
                                onClick={handleClose} // Call the handleClose function when button is clicked
                            >
                                Yes, I'm sure
                            </button>
                            <button
                                type="button"
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
                                onClick={handleClose} // Call the handleClose function when button is clicked
                            >
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
