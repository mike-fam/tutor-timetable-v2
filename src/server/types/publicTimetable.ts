export type PublicTimetableData = {
    [key: string]: CourseOffering;
};

export interface CourseOffering {
    subject_code: string;
    callista_code: string;
    description: string;
    manager: string;
    email_address: string;
    faculty: string;
    semester: string;
    campus: string;
    show_on_timetable: string;
    activity_count: string;
    activities: { [key: string]: Activity };
    children: [];
}

export interface Activity {
    subject_code: string;
    activity_group_code: string;
    activity_code: string;
    campus: string;
    day_of_week: string;
    start_time: string;
    location: string;
    staff: string;
    duration: string;
    selectable: string;
    availability: number;
    week_pattern: string;
    description: string;
    zone: string;
    department: string;
    semester: string;
    activity_type: string;
    start_date: string;
    color: string;
    assigned_locations: { [key: string]: Location };
    cluster: string;
}

export interface Location {
    location_id: string;
    week_pattern: string;
    lat: number;
    lng: number;
}
