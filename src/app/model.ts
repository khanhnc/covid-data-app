export interface PostmanData {
    Country: string;
    CountryCode: string
    Date: String;
    NewConfirmed: number;
    NewDeaths: number;
    NewRecovered: number;
    Premium: any;
    Slug: string;
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number;
}

export interface Country{
    name: string;
    code: string;
}

export interface APCovidData {
    code?: string;
    name?:string;
    population?:number;
    today?: { 
        confirmed: number;
        deaths: number;
    }
    updated_at?: string;
    timeline?: {
        active: number;
        confirmed: number;
        date: string;
        deaths: number;
        is_in_progress: boolean;
        new_confirmed: number;
        new_deaths: number;
        new_recovered: number;
        recovered: number;
        updated_at: string;
    }[];
    latest_data?: {
        confirmed?: number;
        critical?: number;
        deaths?: number;
        recovered?: number;
        calculated?: { 
            cases_per_million_population: number;
            death_rate: number;
            recovered_vs_death_ratio: number;
            recovery_rate: number;        }
        }
}

export interface APPlotData {
    name: string;
    series?: any[]
}