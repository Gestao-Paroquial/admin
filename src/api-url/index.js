export const billingCyclesUrl = process.env.BILLING_CYCLE_API_URI;
export const backEndUrl = process.env.BACK_END_API_URI;

// URL
export const visitantesApiUrl = `${backEndUrl}/api/visitantes`;
export const usersApiUrl = `${backEndUrl}/api/users`;
export const comunidadesApiUrl = `${backEndUrl}/api/comunidades`;
export const pastoraisApiUrl = `${backEndUrl}/api/pastorais`;
export const membrosUrl = `${backEndUrl}/api/membros`;
export const mensagensParocoApiUrl = `${backEndUrl}/api/mensagensParoco`;
export const tiposMembroUrl = `${backEndUrl}/api/tiposMembro`;
export const tiposDependenteUrl = `${backEndUrl}/api/tiposDependente`;
export const tiposEventoUrl = `${backEndUrl}/api/tiposEvento`;
export const tiposUrl = `${backEndUrl}/api/tipos`;
export const dependentesUrl = `${backEndUrl}/api/dependentes`;
export const telefonesUrl = `${backEndUrl}/api/telefones`;
export const aniversariantesUrl = `${backEndUrl}/api/aniversariantes`;
export const facebookApiUrl = `${billingCyclesUrl}/api/facebook`;
export const billingCyclesApiUrl = `${billingCyclesUrl}/api/billingCycles`;
export const billingSummaryApiUrl = `${billingCyclesUrl}/api/billingSummary`;
export const movimentacaoAnualApiUrl = `${billingCyclesUrl}/api/movimentacaoAnual`;
export const findBillingCycleByComunity = `${billingCyclesUrl}/api/billingCycles/findByComunidade`;
export const eventosHomeApiUrl = `${backEndUrl}/api/eventosHome`;
export const uploadImageApiUrl = `${backEndUrl}/api/uploadImagem`;
export const loginApiUrl = `${backEndUrl}/api/login`;
export const logoutApiUrl = `${backEndUrl}/api/logout`;
export const validateTokenUrl = `${backEndUrl}/api/validateToken`;
export const analyticsUrl = `${backEndUrl}/api/analytics`;
export const agendaUrl = `${backEndUrl}/api/agenda`;

// Helpers
export const findBillingCycleByComunityId = comunidadeId => `${findBillingCycleByComunity}?id=${comunidadeId}`;
