<template>
  <div v-if="tabs.tabList">
    <h3>Resumo de todas as movimentações:</h3>
    <ValueRow :credit="billingSummary.credit" :debt="billingSummary.debt" :total="billingSummary.total" />
    <h3>Lista de movimentações:</h3>
    <table class="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Período</th>
          <th>Créditos</th>
          <th>Débitos</th>
          <th>Total</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="billingCycle in billingCycles" :key="billingCycle.id">

          <td>{{billingCycle.name}}</td>
          <td>{{new Date(billingCycle.date).toLocaleDateString('pt-BR',{ year: 'numeric', month: 'long'})}}</td>
          <td>{{formatToPrice(sumProperty(billingCycle.credits))}}</td>
          <td>{{formatToPrice(sumProperty(billingCycle.debts))}}</td>
          <td>{{formatToPrice(sumProperty(billingCycle.credits) - sumProperty(billingCycle.debts))}}</td>
          <td style="width:100px;">
            <button class="btn btn-warning btn-xs" @click="showTabUpdate(billingCycle)">
              <i class="fa fa-pencil"></i>
            </button>
            <button class="btn btn-danger btn-xs" @click="showTabDelete(billingCycle)">
              <i class="fa fa-trash-o"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import ValueRow from '@/components/UIComponents/ValueRow';
export default {
  components:
};
</script>
