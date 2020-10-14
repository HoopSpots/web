type HoopSession = {
	id: number
	uuid: string
	creator_id: number
	hoop_spot_id: number
	start_time: string /* Date */
	end_time: string /* Date */
	created_at: string /* Date */ | null
	updated_at: string /* Date */ | null
	creator?: User|null
	hoopspot?: HoopSpot|null
	members?: User[]|null
	status?: any
	distance_away?: number
};
