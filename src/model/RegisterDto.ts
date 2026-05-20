/*
String username,
			String password,
			String email,
			String address,
			String education,  // HIGH_SCHOOL,UNER_GRADUATE,POST_GRADUATE
			List<String> experties,
			String userType
 */
// E = MC2/ Error = More Code
export interface RegisterDto {
    username: string;
    password: string;
    email: string;
    address: string;
    education: string;
    experties: string[];
    userType: string;
}