import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { Gauge } from 'k6/metrics';
import { Rate } from 'k6/metrics';
import { Trend } from 'k6/metrics';

export const options = {
    vus: 1,
    duration: '3s'
}

const chamadas = new Counter('Quantidade de chamadas');
const myGouge = new Gauge('Tempo bloqueado');
const myRate = new Rate('Taxa de req 200');
const myTrend = new Trend ('Taxa de espera');

export default function(){
    const req = http.get('http://test.k6.io');
    //contador
    chamadas.add(1);
    //medidor
    myGouge.add(req.timings.blocked);
    //taxa
    myRate.add(req.status === 200);
    //tendência
    myTrend.add(req.timings.waiting);
}