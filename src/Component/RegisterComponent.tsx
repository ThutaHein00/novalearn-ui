import {type FormEvent, useState} from "react";
import type {RegisterDto} from "../model/RegisterDto.ts";
import {register} from "../service/AuthService.ts";
import {useNavigate} from "react-router-dom";
// Assuming this is defined

export default function RegisterComponent() {
    const [isTeacher, setIsTeacher] = useState(false);
    // Local state for the comma-separated expertise input field
    const [expert,setExpert] = useState<string>('');
    const navigator = useNavigate();

    // Initial state for the registration data transfer object
    const [registerDto, setRegisterDto] = useState<RegisterDto>({
        username: "",
        password: "",
        email: "",
        address: "",
        education: "",
        experties: [],
        userType: "", // This will be set on submission
    });

    // The values for the custom radio buttons
    const educationArray = ['HIGH_SCHOOL', 'UNDER_GRADUATE', 'POST_GRADUATE'];

    // Handler to update the education field in registerDto (used by radio buttons)
    const handleEducationChange = (value: string) => {
        setRegisterDto(prevDto => ({
            ...prevDto,
            education: value,
        }));
    };

    /**
     * Handles form submission by calculating the final DTO and submitting it.
     * This avoids the asynchronous state update problem by using the calculated object immediately.
     */
    const registerHandler = (e: FormEvent) => {
        e.preventDefault();

        // 1. Calculate the final state values based on component state
        const newUserType = isTeacher ? 'teacher' : 'student';
        let newExperties: string[] = [];

        if (isTeacher) {
            // Parse the comma-separated string into an array, trimming spaces
            newExperties = expert
                .split(',')
                .map(item => item.trim())
                .filter(item => item.length > 0);

            // Clear the input field after parsing
            setExpert('');
        }

        // 2. Construct the FINAL DTO object using the current component state (registerDto)
        // and the calculated transient values (userType, experties).
        const finalDto: RegisterDto = {
            ...registerDto, // Contains username, password, email, address, education (from inputs)
            userType: newUserType,
            experties: newExperties, // This will be [] for students
        };

        // 3. Use the calculated finalDto for logging and the API call
        console.log("Submitting DTO:", finalDto);

        // 4. API Call using the finalDto
        register(finalDto)
            .then(res => {
                console.log("API Success:", res.data);
                navigator('/login');
                // Optionally clear the entire form state here if successful
            })
            .catch(err => console.log("API Error:", err));

        // 5. Optional: Set state with the final DTO for React to update the component
        // (If needed for subsequent UI logic, otherwise, it's not strictly necessary for submission)
        setRegisterDto(finalDto);


    }

    // --- JSX Render ---
    return (
        <>
            <div className="mx-auto max-w-[1400px] mt-10 flex justify-center">
                <form
                    // Note: Removed onSubmit from form tag, handled by button onClick (see below)
                    className="w-full max-w-lg flex flex-col items-center space-y-6
                               border border-gray-200 rounded-lg shadow-xl p-8 bg-white"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">User Registration</h2>

                    {/* 1. Username Input */}
                    <div className="flex flex-col space-y-2 w-full">
                        <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={e => setRegisterDto({...registerDto, username: e.target.value})}
                            placeholder="Enter your username"
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm
                                       focus:outline-none focus:ring-2 focus:ring-blue-500
                                       focus:border-blue-500 sm:text-sm w-full"
                        />
                    </div>

                    {/* --- 2. INLINE CUSTOM RADIO GROUP (Education Selection for Students) --- */}
                    {!isTeacher && (
                        <div className="flex flex-col space-y-2 w-full">
                            <label className="text-sm font-medium text-gray-700">Education Level</label>
                            <div className="flex space-x-3 w-full justify-between">
                                {educationArray.map((edu) => (
                                    <div key={edu} className="relative flex-1">
                                        {/* Hidden Radio Input (The Peer) */}
                                        <input
                                            type="radio"
                                            id={`edu-${edu}`}
                                            name="education"
                                            value={edu}
                                            checked={registerDto.education === edu}
                                            onChange={() => handleEducationChange(edu)}
                                            className="peer hidden" // Hides the default radio
                                        />

                                        {/* Custom Styled Label (The Sibling) */}
                                        <label
                                            htmlFor={`edu-${edu}`}
                                            className="
                                                block w-full text-center py-2 px-1 rounded-md border-2
                                                cursor-pointer transition-all duration-150
                                                border-gray-300 text-gray-700 bg-white hover:border-blue-400
                                                peer-checked:border-blue-600
                                                peer-checked:bg-blue-50
                                                peer-checked:text-blue-700
                                            "
                                        >
                                            <span className="text-xs font-semibold">{edu.replace(/_/g, ' ')}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* ---------------------------------------------------------------- */}

                    {/* 3. Password Input */}
                    <div className="flex flex-col space-y-2 w-full">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={e => setRegisterDto({...registerDto, password: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm
                                       focus:outline-none focus:ring-2 focus:ring-blue-500
                                       focus:border-blue-500 sm:text-sm w-full"
                        />
                    </div>

                    {/* 4. Email Input */}
                    <div className="flex flex-col space-y-2 w-full">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={e => setRegisterDto({...registerDto, email: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm
                                       focus:outline-none focus:ring-2 focus:ring-blue-500
                                       focus:border-blue-500 sm:text-sm w-full"
                        />
                    </div>

                    {/* 5. Address Input (Student or Teacher) */}
                    <div className="flex flex-col space-y-2 w-full">
                        <label htmlFor="address" className="text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Enter your address"
                            onChange={e => setRegisterDto({...registerDto, address: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm
                                       focus:outline-none focus:ring-2 focus:ring-blue-500
                                       focus:border-blue-500 sm:text-sm w-full"
                        />
                    </div>

                    {/* 6. Education Text Input (Only for Teachers to specify detail) */}
                    {isTeacher && <div className="flex flex-col space-y-2 w-full">
                        <label htmlFor="education" className="text-sm font-medium text-gray-700">Highest Education Detail (e.g., University/Degree)</label>
                        <input
                            type="text"
                            id="education"
                            name="education"
                            placeholder="Specify major or institute"
                            onChange={e => setRegisterDto({...registerDto, education: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm
                                       focus:outline-none focus:ring-2 focus:ring-blue-500
                                       focus:border-blue-500 sm:text-sm w-full"
                        />
                    </div>}

                    {/* 7. Expert Skill (Shown when Teacher) */}
                    {isTeacher && (
                        <div className="flex flex-col space-y-2 w-full">
                            <label htmlFor="expert" className="text-sm font-medium text-gray-700">Expert Skill (Comma Separated)</label>
                            <input
                                type="text"
                                id="expert"
                                value={expert}
                                name="expert"
                                onChange={e => setExpert(e.target.value)}
                                placeholder="Enter your expertise (e.g., Math, History)"
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm
                                       focus:outline-none focus:ring-2 focus:ring-blue-500
                                       focus:border-blue-500 sm:text-sm w-full"
                            />
                        </div>
                    )}

                    {/* 8. Is Teacher Checkbox */}
                    <div className="flex items-center space-x-2 w-full">
                        <input
                            type="checkbox"
                            id="is-teacher-checkbox"
                            name="isTeacher"
                            checked={isTeacher}
                            onChange={() => setIsTeacher(!isTeacher)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                            htmlFor="is-teacher-checkbox"
                            className="text-sm font-medium text-gray-700 select-none"
                        >
                            Register as a **Teacher**
                        </label>
                    </div>

                    {/* 9. Submit Button */}
                    <button
                        type="button"
                        onClick={registerHandler} // Call the handler on button click
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold
                                   hover:bg-blue-700 focus:outline-none focus:ring-2
                                   focus:ring-blue-500 focus:ring-offset-2 transition duration-150"
                    >
                        Register
                    </button>
                </form>
            </div>
        </>
    );
}