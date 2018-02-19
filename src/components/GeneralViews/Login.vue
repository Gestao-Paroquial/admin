<template>
  <div class="wrapper wrapper-full-page">
    <div class="full-page login-page">
      <div class="content">
        <div class="container">
          <div class="row">
            <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
              <form method="#" action="#">
                <div data-background="color" data-color="blue" class="card">
                  <div class="card-header">
                    <h3 class="card-title">Login</h3>
                  </div>
                  <div class="card-content">
                    <div class="form-group">
                      <label>Email</label> <input type="text" placeholder="Email" class="form-control input-no-border"></div>
                    <div class="form-group">
                      <label>Senha</label> <input type="password" placeholder="Senha" class="form-control input-no-border"></div>
                  </div>
                  <div class="card-footer text-center">
                    <button type="submit" class="btn btn-fill btn-wd " @click="login">Login</button>
                    <div class="forgot">
                      <br>
                      <a href="/register" class="">
                        Esqueceu sua senha?
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer footer-transparent">
        <div class="container">
          <div class="copyright">
            © Coded with
            <i class="fa fa-heart heart"></i> by
            <a href="https://github.com/Gestao-Paroquial" target="_blank">Gestão Paroquial</a>
          </div>
        </div>
      </footer>
      <div class="full-page-background"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      localStorage.setItem("login", true);
      this.$router.push({ path: "/" });
    }
  },
  created() {
    if (this.$route.path.match("logout")) {
      localStorage.setItem("login", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper.wrapper-full-page {
  height: auto;
  min-height: 100vh;
}
body .wrapper {
  min-height: 100vh;
  position: relative;
}
.lock-page > .content,
.login-page > .content {
  padding-top: 20vh;
}
.full-page .footer .copyright,
.full-page .footer .copyright a,
.full-page .footer nav > ul a:not(.btn) {
  color: #fff;
  font-size: 14px;
}
.full-page > .content,
.full-page > .footer {
  position: relative;
  z-index: 4;
}

.full-page > .content {
  min-height: calc(100vh - 70px);
}

.card .card-header {
  padding: 20px 15px 0;
  position: relative;
  border-radius: 3px 3px 0 0;
  z-index: 3;
}

.card .card-content {
  padding: 15px 15px 10px;
}

.card .card-content {
  padding: 15px 15px 10px;
}

.card .card-title {
  margin: 0;
  color: #252422;
  font-weight: 300;
}

.form-group {
  margin-bottom: 15px;
}
.form-control.input-no-border {
  border: 0 none;
}

.form-group {
  position: relative;
}

.card .card-footer {
  padding: 0 15px 15px;
}
.full-page .full-page-background {
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  display: block;
  top: 0;
  left: 0;
  background-size: cover;
  background-position: 50%;
  background-image: url("https://images.unsplash.com/photo-1506205987431-abdad60a2aff?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=096907aaab4d09577e5ea2147be1cc44&auto=format&fit=crop&w=1350&q=80");
}
</style>
