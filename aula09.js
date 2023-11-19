//1. inicialização
import sleep from 'k6';

//2. configuração
export const options = {
    vus: 1,
    duration: '10s'
}

//3. execução // código vu
export default function(){
    console.log('testando o K6');
    sleep(1);
}

//4.desmontagem // opcional
export function teardown(data){
    console.log(data)
}