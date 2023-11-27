import React from "react";
import one from "../assets/one.svg";
import two from "../assets/two.svg";
import three from "../assets/three.svg";


export default function Table()
{
    return (
        <>
            <div className="flex flex-row gap-4 p-4 overflow-x-auto whitespace-nowrap hide-scrollbar">
                <button className="px-8 border-[#08DA75] border-2 bg-[#08DA75] text-lg">All</button>
                <button className="px-8 border-[#08DA75] border-2  text-lg">Cardiologist</button>
                <button className="px-8 border-[#08DA75] border-2  text-lg">Therapist</button>
                <button className="px-8 border-[#08DA75] border-2  text-lg">Pediatrician</button>
                <button className="px-8 border-[#08DA75] border-2  text-lg">Neurologist</button>
                <button className="px-8 border-[#08DA75] border-2  text-lg">Physiotherapist</button>
                <button className="px-8 border-[#08DA75] border-2  text-lg">Cardiologist</button>
                <button className="px-8 border-[#08DA75] border-2  text-lg">Therapist</button>
                <button className="px-8 border-[#08DA75] border-2  text-lg">Pediatrician</button>
                <button className="px-8 border-[#08DA75] border-2  text-lg">Neurologist</button>
                <button className="px-8 border-[#08DA75] border-2  text-lg">Physiotherapist</button>
                <button className="px-8 border-[#08DA75] border-2  text-lg">Pediatrician</button>
                <button className="px-8 border-[#08DA75] border-2  text-lg">Neurologist</button>
                <button className="px-8 border-[#08DA75] border-2  text-lg">Physiotherapist</button>
            </div>
            <div className="flex flex-col p-4">
                <div className="bg-white w-full p-4 mb-5">
                    <div className="flex flex-row justify-between">
                        <div class="flex items-center gap-x-2">
                            <img class="object-cover sm:w-20 sm:h-20 w-10 h-10  rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />

                            <div>
                                <h1 class=" font-semibold text-gray-700 sm:text-lg text-sm capitalize">Dr. Kanchan Bohra</h1>

                                <p class=" text-gray-500 sm:text-sm text-xs ">Pediatrician Specialist</p>
                                <p class=" text-gray-500 sm:text-sm text-xs ">7 Years Experience</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <div className="flex flex-row gap-5 ">
                                <img src={one} className="sm:w-5 sm:h-5 w-4 h-4" alt="img" />
                                <img src={two} className="sm:w-5 sm:h-5 w-4 h-4" alt="img" />
                            </div>
                            <div className="flex flex-row items-center">
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <div className="text-xs sm:text-lg">(4.5 Ratings)</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white w-full p-4 mb-5">
                    <div className="flex flex-row justify-between">
                        <div class="flex items-center gap-x-2">
                            <img class="object-cover sm:w-20 sm:h-20 w-10 h-10  rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />

                            <div>
                                <h1 class=" font-semibold text-gray-700 sm:text-lg text-sm capitalize">Dr. Kanchan Bohra</h1>

                                <p class=" text-gray-500 sm:text-sm text-xs ">Pediatrician Specialist</p>
                                <p class=" text-gray-500 sm:text-sm text-xs ">7 Years Experience</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <div className="flex flex-row gap-5 ">
                                <img src={one} className="sm:w-5 sm:h-5 w-4 h-4" alt="img" />
                                <img src={two} className="sm:w-5 sm:h-5 w-4 h-4" alt="img" />
                            </div>
                            <div className="flex flex-row items-center">
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <div className="text-xs sm:text-lg">(4.5 Ratings)</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white w-full p-4 mb-5">
                    <div className="flex flex-row justify-between">
                        <div class="flex items-center gap-x-2">
                            <img class="object-cover sm:w-20 sm:h-20 w-10 h-10  rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />

                            <div>
                                <h1 class=" font-semibold text-gray-700 sm:text-lg text-sm capitalize">Dr. Kanchan Bohra</h1>

                                <p class=" text-gray-500 sm:text-sm text-xs ">Pediatrician Specialist</p>
                                <p class=" text-gray-500 sm:text-sm text-xs ">7 Years Experience</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <div className="flex flex-row gap-5 ">
                                <img src={one} className="sm:w-5 sm:h-5 w-4 h-4" alt="img" />
                                <img src={two} className="sm:w-5 sm:h-5 w-4 h-4" alt="img" />
                            </div>
                            <div className="flex flex-row items-center">
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <div className="text-xs sm:text-lg">(4.5 Ratings)</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white w-full p-4 mb-5">
                    <div className="flex flex-row justify-between">
                        <div class="flex items-center gap-x-2">
                            <img class="object-cover sm:w-20 sm:h-20 w-10 h-10  rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />

                            <div>
                                <h1 class=" font-semibold text-gray-700 sm:text-lg text-sm capitalize">Dr. Kanchan Bohra</h1>

                                <p class=" text-gray-500 sm:text-sm text-xs ">Pediatrician Specialist</p>
                                <p class=" text-gray-500 sm:text-sm text-xs ">7 Years Experience</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <div className="flex flex-row gap-5 ">
                                <img src={one} className="sm:w-5 sm:h-5 w-4 h-4" alt="img" />
                                <img src={two} className="sm:w-5 sm:h-5 w-4 h-4" alt="img" />
                            </div>
                            <div className="flex flex-row items-center">
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <div className="text-xs sm:text-lg">(4.5 Ratings)</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white w-full p-4 mb-5">
                    <div className="flex flex-row justify-between">
                        <div class="flex items-center gap-x-2">
                            <img class="object-cover sm:w-20 sm:h-20 w-10 h-10  rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />

                            <div>
                                <h1 class=" font-semibold text-gray-700 sm:text-lg text-sm capitalize">Dr. Kanchan Bohra</h1>

                                <p class=" text-gray-500 sm:text-sm text-xs ">Pediatrician Specialist</p>
                                <p class=" text-gray-500 sm:text-sm text-xs ">7 Years Experience</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <div className="flex flex-row gap-5 ">
                                <img src={one} className="sm:w-5 sm:h-5 w-4 h-4" alt="img" />
                                <img src={two} className="sm:w-5 sm:h-5 w-4 h-4" alt="img" />
                            </div>
                            <div className="flex flex-row items-center">
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <div className="text-xs sm:text-lg">(4.5 Ratings)</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white w-full p-4 mb-5">
                    <div className="flex flex-row justify-between">
                        <div class="flex items-center gap-x-2">
                            <img class="object-cover sm:w-20 sm:h-20 w-10 h-10  rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />

                            <div>
                                <h1 class=" font-semibold text-gray-700 sm:text-lg text-sm capitalize">Dr. Kanchan Bohra</h1>

                                <p class=" text-gray-500 sm:text-sm text-xs ">Pediatrician Specialist</p>
                                <p class=" text-gray-500 sm:text-sm text-xs ">7 Years Experience</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <div className="flex flex-row gap-5 ">
                                <img src={one} className="sm:w-5 sm:h-5 w-4 h-4" alt="img" />
                                <img src={two} className="sm:w-5 sm:h-5 w-4 h-4" alt="img" />
                            </div>
                            <div className="flex flex-row items-center">
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <div className="text-xs sm:text-lg">(4.5 Ratings)</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white w-full p-4 mb-5">
                    <div className="flex flex-row justify-between">
                        <div class="flex items-center gap-x-2">
                            <img class="object-cover sm:w-20 sm:h-20 w-10 h-10  rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=faceare&facepad=3&w=688&h=688&q=100" alt="" />

                            <div>
                                <h1 class=" font-semibold text-gray-700 sm:text-lg text-sm capitalize">Dr. Kanchan Bohra</h1>

                                <p class=" text-gray-500 sm:text-sm text-xs ">Pediatrician Specialist</p>
                                <p class=" text-gray-500 sm:text-sm text-xs ">7 Years Experience</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <div className="flex flex-row gap-5 ">
                                <img src={one} className="sm:w-5 sm:h-5 w-4 h-4" alt="img" />
                                <img src={two} className="sm:w-5 sm:h-5 w-4 h-4" alt="img" />
                            </div>
                            <div className="flex flex-row items-center">
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <img src={three} alt="img" className="sm:w-5 sm:h-5 w-4 h-4" />
                                <div className="text-xs sm:text-lg">(4.5 Ratings)</div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}