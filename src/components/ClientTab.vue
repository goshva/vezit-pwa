<template>
  <div>
    <BaseBlock class="mb-0">
      <template #content>
        <ul class="nav nav-tabs nav-tabs-block" role="tablist">
          <li class="nav-item">
            <button
              class="nav-link active"
              id="btabs-static-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#btabs-static-home"
              role="tab"
              aria-controls="btabs-static-home"
              aria-selected="true"
            >
              Юр. лицо
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              id="btabs-static-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#btabs-static-profile"
              role="tab"
              aria-controls="btabs-static-profile"
              aria-selected="false"
            >
              Физ. лицо
            </button>
          </li>
        </ul>
        <div class="block-content tab-content">
          <div
            class="tab-pane active"
            id="btabs-static-home"
            role="tabpanel"
            aria-labelledby="btabs-static-home-tab"
            tabindex="0"
          >
            <BaseBlock title="Юр. лицо" class="m-5">
              <div class="">
                <!-- Sign In Form -->
                <div class="mb-4">
                  <input
                    type="text"
                    class="form-control form-control-alt form-control-lg"
                    placeholder="ИНН"
                  />
                </div>

                <div class="mb-4">
                  <input
                    type="text"
                    class="form-control form-control-alt form-control-lg"
                    placeholder="ОГРН/ОГРИП"
                  />
                </div>

                <div class="mb-4">
                  <input
                    type="text"
                    class="form-control form-control-alt form-control-lg"
                    placeholder="Название компании"
                  />
                </div>

                <div class="mb-4">
                  <input
                    type="text"
                    class="form-control form-control-alt form-control-lg"
                    placeholder="Директор(ФИО)"
                  />
                </div>

                <div class="mb-4">
                  <input
                    type="text"
                    class="form-control form-control-alt form-control-lg"
                    placeholder="Юридический адрес"
                  />
                </div>

                <div class="mb-4">
                  <input
                    type="text"
                    class="form-control form-control-alt form-control-lg"
                    placeholder="Фактический адрес"
                  />
                </div>

                <div class="mb-4">
                  <input
                    type="text"
                    class="form-control form-control-alt form-control-lg"
                    placeholder="Вид деятельности"
                  />
                </div>

                <div class="mb-2">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="login-remember"
                      name="login-remember"
                    />
                    <label class="form-check-label" for="login-remember"
                      >Я согласен с договором оферты</label
                    >
                  </div>
                </div>

                <div class="mb-4">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="login-remember"
                      name="login-remember"
                    />
                    <label class="form-check-label" for="login-remember"
                      >Создать договор оферты</label
                    >
                  </div>
                </div>
                
                <div class="mb-4">
                  <button type="submit" class="btn w-100 btn-alt-primary">
                    <i class=""></i>
                    Отправить
                  </button>
                </div>
              </div>
              <!-- END Sign In Form -->
            </BaseBlock>
          </div>
          <div
            class="tab-pane"
            id="btabs-static-profile"
            role="tabpanel"
            aria-labelledby="btabs-static-profile-tab"
            tabindex="0"
          >
            <BaseBlock title="Физ. лицо" class="m-5">
              <div class="">
                <!-- Sign In Form -->
                <div class="mb-4">
                  <input
                    type="text"
                    class="form-control form-control-alt form-control-lg"
                    placeholder="ФИО"
                  />
                </div>

                <div class="mb-4">
                  <input
                    type="text"
                    class="form-control form-control-alt form-control-lg"
                    placeholder="ИНН"
                  />
                </div>

                <div class="mb-4">
                  <input
                    type="text"
                    class="form-control form-control-alt form-control-lg"
                    placeholder="ОГРН/ОГРИП"
                  />
                </div>

                <div class="mb-4">
                  <input
                    type="text"
                    class="form-control form-control-alt form-control-lg"
                    placeholder="Название компании"
                  />
                </div>


                <div class="mb-4">
                  <input
                    type="text"
                    class="form-control form-control-alt form-control-lg"
                    placeholder="Адрес"
                  />
                </div>

                <div class="mb-4">
                  <input
                    type="text"
                    class="form-control form-control-alt form-control-lg"
                    placeholder="Вид деятельности"
                  />
                </div>

                <div class="mb-4">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="login-remember"
                      name="login-remember"
                    />
                    <label class="form-check-label" for="login-remember"
                      >Создать договор</label
                    >
                  </div>
                </div>
                <div class="mb-4">
                  <button type="submit" class="btn w-100 btn-alt-primary">
                    <i class=""></i>
                    Отправить
                  </button>
                </div>
              </div>
              <!-- END Sign In Form -->
            </BaseBlock>
          </div>
        </div>
      </template>
    </BaseBlock>
  </div>
</template>
<script setup></script>
<style lang="scss"></style>
