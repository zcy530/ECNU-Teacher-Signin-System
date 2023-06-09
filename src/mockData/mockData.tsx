export type course = {
    courseId: string;
    name: string;
    longitude: number;
    latitude: number;
    startTime: string;
    endTime: string;
    weekday: string;
}

export type courseShow = {
    courseName: string;
    courseId: string;
    courseColor: string;
}