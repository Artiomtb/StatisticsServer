interface IPub {
    pub_name: string;
    pub_id: number;

}

interface IPubs {
    pubs: Array<IPub>;
    pages: number;
    current_page: number;
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
    transitions: Array<any>;
    link_time: number;
}

interface IStudentStatistic {
    student: IStudent;
    total_attendance: number;
}

interface IStudentStatistics {
    student: string;
    pubs: Array<IPub>;
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
    trend: Array<ITrend>;
}

interface IStudents {
    pages: number;
    students: Array<IStudent>;
    current_page: number;
}

interface IStudentMaterial {
    material_name: IMaterial;
    trend:  Array<ITrend>;
    total_attendance: number;
}

interface IStudentNodeStatistics {
    node_name: string;
    node_stats: Array<ITrend>;
    materials: Array<IStudentMaterial>;
}

interface ISearchEntry {
    name: string;
    id: number;
}

interface ISearchService {
    getPubsResultsPath(): string;
    getStudentsPath(): string;
    getResultsPath(): string;
    autoCompletePubsHandler(text: string): any;
    autoCompleteStudentsHandler(text: string): any;
    searchPubsHandler(text: string, page: number): any;
    searchStudentsHandler(text: string, page: number): any;
    getSearchResults(searchArea: string, queryString: string, page: number): any;
    getSearchConfiguration(area?: String, defaultValue?: String): any;
}

interface ISearchResult {
    items: Array<ISearchEntry>
}

interface ISearchResults {
    results: ISearchResult;
    pages: number;
    current_page: number;
}

