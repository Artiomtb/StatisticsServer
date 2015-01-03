interface IPub {
    node_name: string;
    node_id: number;
}

interface IPubs {
    pubs: Array<IPub>;
    pages: number;
}

interface IMaterial {
    name: string;
    material_id: number;
    total_attendance: number;
}

interface IPubStats {
    materials: Array<IMaterial>;
    students: Array<IStudentStatistic>;
    trend: Array<number>;
    materials_trends: Array<ITrend>;
}

interface IStudentStatistic {
    student: IStudent;
    total_attendance: number;
}

interface IStudentStatistics {
    student: string;
    nodes: IPub;
}

interface IStudent {
    party_id: number;
    party_name: string;
}

interface ITrend {
    date: Date;
    time: number;
}

interface INodeStatistics {
    materials: Array<IMaterial>;
    students: Array<IStudent>;
    trend: ITrend;
}

interface IStudents {
    pages: number;
    students: Array<IStudent>;
}

interface IStudentMaterial {
    material_name: IMaterial;
    trend: ITrend;
    total_attendance: number;
}

interface IStudentNodeStatistics {
    node_name: string;
    node_stats: Array<ITrend>;
    materials: Array<IStudentMaterial>;
}