<template>
  <div class="col-md-12 col-lg-6 col-sm-12">
    <div class="white-box">
      <h3 class="box-title">Solicitações de {{title}}</h3>
      <div class="comment-center">
        <div class="comment-body" v-for="(solicitacao, index) in solicitacoes" :key="index">
          <div class="mail-content">
            <h5>{{solicitacao.nome}}</h5>
            <h6>{{solicitacao.email}}</h6>
            <span class="time">{{fromNow(solicitacao.updated_at)}}</span>
            <span class="label label-rouded" :class="statusClass(solicitacao.aprovado)">{{getNameStatus(solicitacao.aprovado)}}</span>
            <br>
            <span class="mail-desc">{{solicitacao.mensagem}}</span>
            <div v-if="solicitacao.aprovado === 0">
              <a @click.prevent="updateSolicitacao(solicitacao,1)" class="btn btn btn-rounded btn-default btn-outline m-r-5">
                <i class="ti-check text-success m-r-5"></i>Aprovar</a>
              <a @click.prevent="motivoDaReprovacao(solicitacao)" class="btn-rounded btn btn-default btn-outline">
                <i class="ti-close text-danger m-r-5"></i> Rejeitar</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal :name="title">
      <div class="card">
        <div class="header">
          <h5 class="title">Texto para enviar ao solicitante</h5>
        </div>
        <div class="content">

          <form @submit.prevent="reprovarSolicitacao">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                    <textarea v-model="conteudoEmail" required class="form-control border-input"></textarea>
                </div>
              </div>
            </div>
            <div class="text-center">
              <button class="btn btn-info  btn-wd" type="submit">
                Enviar
              </button>
              <hr>
              <button class="btn  btn-wd" type="button" @click.prevent="hideModal">
                Cancelar
              </button>
            </div>
            <div class="clearfix" />
          </form>
        </div>

      </div>
    </modal>
  </div>
</template>
<script>
import moment from '@/plugins/moment';
import axios from '@/plugins/axios';
import { pedidosUrl } from '../../../../api-url/index';

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    solicitacoes: {
      type: Array,
    },
    preco: [Number, String],
  },
  data() {
    return {
      conteudoEmail: null,
      solicitacaoSelecionada: {},
    };
  },
  methods: {
    getNameStatus(status) {
      return {
        0: 'Pendente',
        1: 'Aprovado',
        2: 'Reprovado',
      }[status];
    },
    statusClass(status) {
      return {
        0: 'label-info',
        1: 'label-success',
        2: 'label-danger',
      }[status];
    },
    motivoDaReprovacao(solicitacao) {
      this.conteudoEmail =
`Olá ${solicitacao.nome}.

Infelizmente essa data não está disponível.

Caso queira mais informações ligue para (11) 98765-4321.

Obrigado,
Paroquia São Lucas Evangelista.`;
      this.solicitacaoSelecionada = solicitacao;
      this.showModal();
    },
    reprovarSolicitacao() {
      this.solicitacaoSelecionada.conteudoEmail = this.conteudoEmail;
      this.hideModal();
      this.updateSolicitacao(this.solicitacaoSelecionada, 2);
    },
    updateSolicitacao(solicitacao, aprovado) {
      let dialog;
      solicitacao.preco = this.preco;
      this.$dialog
        .confirm()
        .then((dialog_) => {
          dialog = dialog_;
          Object.assign(solicitacao, { aprovado });
          return axios.put(`${pedidosUrl}/${solicitacao.id}`, JSON.stringify(solicitacao), { headers: { 'Content-Type': 'application/json' } });
        })
        .then(({ data }) => {
          dialog.close();
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fromNow(data) {
      return moment(data, 'YYYY-MM-DD').fromNow();
    },
    showModal() {
      this.$modal.show(this.title);
    },
    hideModal() {
      this.$modal.hide(this.title);
    },
  },
};
</script>
<style >
.comment-center .mail-content h5 {
  margin-top: 0;
  font-weight: 400;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.comment-center .mail-content h6 {
  text-transform: lowercase;
  color: #c0c0c0;
}
.comment-center .mail-content .time {
  display: inline-block;
  font-size: 12px;
  color: #98a6ad;
}
.white-box {
  /* background: #fcfcfc; */
  padding: 25px;
  margin-bottom: 30px;
  border-radius: 5px;
}
.white-box .box-title {
  margin: 0 0 12px;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 18px;
}
.comment-center .comment-body {
  border-bottom: 1px solid rgba(120, 130, 140, 0.13);
  display: table;
  width: 100%;
  padding: 20px 25px;
  transition: all ease-in 0.3s;
}
.comment-center .mail-content {
  display: table-cell;
  padding-left: 15px;
  vertical-align: top;
}
.comment-center .mail-content .time {
  display: inline-block;
  font-size: 12px;
  color: #98a6ad;
}
.label-rouded,
.label-rounded {
  border-radius: 60px;
  padding: 4px 12px 3px;
  font-weight: 500;
}
.comment-center .mail-content .mail-desc {
  font-size: 14px;
  display: block;
  margin: 15px 0;
  line-height: 25px;
  color: #848a96;
  overflow: hidden;
  max-height: 52px;
  text-overflow: ellipsis;
}
.label-rouded,
.label-rounded {
  border-radius: 60px;
  padding: 4px 12px 3px;
  font-weight: 500;
}

.btn-default,
.btn-default.disabled {
  background: #fff;
  border: 1px solid #e4e7ea;
}

.btn-default.btn-outline.focus,
.btn-default.btn-outline:focus,
.btn-default.btn-outline:hover {
  background: #e4e7ea;
  border: 1px solid #e4e7ea;
  color: #000;
}

.comment-center .comment-body:hover {
  background: #f7fafc;
}
</style>
