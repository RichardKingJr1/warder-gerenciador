export interface usuarioType {
    id: string,
    id_imovel: number,
    rg: string,
    lat: number,
    lon: number,
    lat_d: number,
    lon_d: number,
    destino: string,
    tempo_chegada: string,
    tempo_permanencia: string,
    tempo_saida: string,
    duracao_viajem: number,
    status: number,
    timeOut: boolean,
    ultrapassouTempo: boolean,
    minimizou: boolean,
    onRoute: boolean
}

export interface estacionandoType {
    rg: string;
    timestamp: number;
}