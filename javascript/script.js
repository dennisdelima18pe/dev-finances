const openModal = document.querySelector('[data-openModal]') 
const modal = document.querySelector('[data-containerModal]')
const cancelar = document.querySelector('[data-btn = "cancelar"]')
const arrayTransacao = []
const teste = document.querySelector('.teste')
const entradas = document.querySelector('.entradas')
const saidas = document.querySelector('.saidas')
const total = document.querySelector('.total')
const blur = document.querySelectorAll('.blur') 
const olhoBlur = document.querySelector('.olhoBlur')
const table = document.querySelector('table') 
olhoBlur.addEventListener('click',()=>{

   blur.forEach((blur)=>{
      blur.classList.toggle('ativoBlur')
   })
})
openModal.addEventListener('click',()=>{
  modal.classList.add('ativo')
})

cancelar.addEventListener('click',()=>{
  modal.classList.remove('ativo')
})

function enviar(){
  const objetoTransacao = {
    descricao:document.querySelector('[data-descricao]').value,
    saldo:document.querySelector('[data-saldo]').value, 
    data:document.querySelector('[data-date]').value,
  }

  modal.classList.remove('ativo')

  document.querySelector('[data-descricao]').value = " "
  document.querySelector('[data-saldo]').value = " "
 document.querySelector('[data-date]').value = " "
  arrayTransacao.push(objetoTransacao)
  const transacaoJson = JSON.stringify(arrayTransacao) 
  localStorage.setItem('transation',transacaoJson)
  extrato.receberDados(JSON.parse(localStorage.getItem('transation'))) 
  extrato.historico(JSON.parse(localStorage.getItem('transation'))) 
}
const extrato = {
  receberDados(dados){
      const saldo =  dados.reduce((saldoAnterior,saldoAtual)=>{
        const saldoConvertido = +saldoAtual.saldo 
  
        if(saldoConvertido > 0){
          const entradasRetorno =  saldoAnterior + saldoConvertido
          const saldoReal = entradasRetorno.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
          localStorage.setItem('Entradas',entradasRetorno)
          entradas.innerText =saldoReal, localStorage.setItem('Entradas',saldoReal)
        }else{
          const saldoReal =  saldoConvertido.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})

          saidas.innerText = saldoReal
        }
        return saldoAnterior + saldoConvertido 
       },0)
      
       const saldoTotal = saldo.toLocaleString('pt-BR',{style:'currency', currency: 'BRL'})
       total.innerText =  saldoTotal
  }, 
  historico(historico){
  historico.forEach((historico)=>{
     const tr = document.createElement('tr') 
     const td = document.createElement('td') 
     const td2 = document.createElement('td')
     const td3 = document.createElement('td')
     td.innerText = historico.descricao 
     td2.innerText = "R$ " + historico.saldo
     td3.innerText = historico.data.split('-').reverse().join('/')
     tr.appendChild(td)
     tr.appendChild(td2)
     tr.appendChild(td3)
     tr.classList.add('tr-create')
     table.appendChild(tr)
      
  })
  

}  
}
