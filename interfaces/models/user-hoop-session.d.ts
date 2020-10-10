type UserHoopSession = {
	hoop_session_id: number
	user_id: number
	responded_at: string /* Date */
	is_going: boolean
	user?: User|null
	hoop_session?: HoopSession|null
};