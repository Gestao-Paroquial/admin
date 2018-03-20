export const billingCyclesUrl = process.env.BILLING_CYCLE_API_URI;
export const backEndUrl = process.env.BACK_END_API_URI;

// URL
export const visitantesApiUrl = `${backEndUrl}/api/visitantes`;
export const comunidadesApiUrl = `${backEndUrl}/api/comunidades`;
export const pastoraisApiUrl = `${backEndUrl}/api/pastorais`;
export const membrosPastoraisApiUrl = `${backEndUrl}/api/membrosPastorais`;
export const mensagensParocoApiUrl = `${backEndUrl}/api/mensagensParoco`;
export const billingCyclesApiUrl = `${billingCyclesUrl}/api/billingCycles`;
export const billingSummaryApiUrl = `${billingCyclesUrl}/api/billingSummary`;
export const findBillingCycleByComunity = `${billingCyclesUrl}/api/billingCycles/findByComunidade`;
export const eventosHomeApiUrl = `${backEndUrl}/api/eventosHome`;
export const uploadImageApiUrl = `${backEndUrl}/api/uploadImagem`;
export const loginApiUrl = `${backEndUrl}/api/login`;
export const logoutApiUrl = `${backEndUrl}/api/logout`;
export const validateTokenUrl = `${backEndUrl}/api/validateToken`;

// Helpers
export const findBillingCycleByComunityId = comunidadeId => `${findBillingCycleByComunity}?id=${comunidadeId}`
;
