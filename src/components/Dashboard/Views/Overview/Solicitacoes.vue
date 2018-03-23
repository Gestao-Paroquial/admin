<template>
  <div class="col-md-12 col-lg-6 col-sm-12">
    <div class="white-box">
      <h3 class="box-title">Solicitações de {{title}}</h3>
      <div class="comment-center">
        <div class="comment-body" v-for="(solicitacao, index) in solicitacoes" :key="index">
          <div class="mail-contnet">
            <h5>{{solicitacao.nome}}</h5>
            <span class="time">{{formatCompleteDate(solicitacao.data)}}</span>
            <span class="label label-rouded" :class="statusClass(solicitacao.status)">{{solicitacao.status}}</span>
            <br>
            <span class="mail-desc">{{solicitacao.mensagem}}</span>
            <div v-if="solicitacao.status === 'Pendente'">
              <a @click.prevent="aprovarSolicitacao(solicitacao)" class="btn btn btn-rounded btn-default btn-outline m-r-5">
                <i class="ti-check text-success m-r-5"></i>Aprovar</a>
              <a @click.prevent="rejeitarSolicitacao(solicitacao)" class="btn-rounded btn btn-default btn-outline">
                <i class="ti-close text-danger m-r-5"></i> Rejeitar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    solicitacoes: {
      type: Array,
    },
  },
  methods: {
    statusClass(status) {
      return {
        Pendente: 'label-info',
        Aprovado: 'label-success',
        Rejeitado: 'label-danger',
      }[status];
    },
    aprovarSolicitacao(solicitacao) {
      this.$dialog
        .confirm()
        .then((dialog) => {
          dialog.close();
          Object.assign(solicitacao, { status: 'Aprovado' });
        })
        .catch(() => {
          console.log('Clicked on cancel');
        });
    },
    rejeitarSolicitacao(solicitacao) {
      this.$dialog
        .confirm()
        .then((dialog) => {
          dialog.close();
          Object.assign(solicitacao, { status: 'Rejeitado' });
        })
        .catch(() => {
          console.log('Clicked on cancel');
        });
    },
  },
};
</script>
<style >
.comment-center .mail-contnet h5 {
  margin-top: 0;
  font-weight: 400;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.comment-center .mail-contnet .time {
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
.comment-center .mail-contnet {
  display: table-cell;
  padding-left: 15px;
  vertical-align: top;
}
.comment-center .mail-contnet .time {
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
.comment-center .mail-contnet .mail-desc {
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
