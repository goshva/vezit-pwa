<script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import axiosInstance from "@/services/axios.js";
import { arr } from "@/constans.js";
import RemoveData from "@/components/RemoveData.vue";
import EditData from "@/components/EditData.vue";

  const route = useRoute();
  const router = useRouter();
  
  const ad = ref({
    id: null,
    filename: "",
    serverfilename: "",
    userid: null,
    duration: "",
    url: "",
    mainlocation: null,
    status: 0,
  });
const selectedCheckboxes = ref([]);
const comment = ref("");
const reson_obj = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
};

const printSelectedCheckboxes = () => {
  console.log(selectedCheckboxes.value);
  
  // Обновляем reson_obj
  selectedCheckboxes.value.forEach(index => {
    if (reson_obj.hasOwnProperty(index)) {
      reson_obj[index] = true;
    }
  });

  console.log(reson_obj);

  if (comment.value.trim() !== "") {
    console.log('Comment:', comment.value);
    comment.value = "";
  }
  selectedCheckboxes.value = [];

  router.push({ path: `/checkVideos/${parseInt(route.params.id) + 1}` });

};

  const fetchAdDetails = async (id) => {
    try {
      const response = await axiosInstance.get(`/videos/${id}`);
      ad.value = response.data;
    } catch (error) {
      console.error("Error fetching ad details:", error);
    }
  };
  

  
  onMounted(() => {
    fetchAdDetails(route.params.id);
  });


let isShowBtn = ref(true);
let modalTitle = ref("18+");
let modalContent = ref(
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat voluptas expedita aspernatur natus quo quis beatae laudantium earum voluptatum fugiat atque veritatis, maxime iure doloribus a enim magnam consectetur? Culpa unde commodi quis a aliquam exercitationem nihil neque cupiditate, accusamus in delectus consequuntur, deleniti dicta totam facilis illum libero, numquam ex quas eveniet. Quam quae consectetur fugiat doloremque exercitationem odit nostrum sapiente illo atque in ut sequi eveniet cum voluptatem, quibusdam rerum dolorum veritatis dolor sit sunt similique recusandae ab ipsam rem! Quos ratione harum non quis porro, distinctio consectetur esse odit tempore eius hic numquam nam rem cupiditate voluptate."
);

//url partner
let url = ref("https://www.bk.com");

// undisable button => "Принять"
const handleShowBtn = () => {
  isShowBtn.value = false;
};


// show modal function
const handleOpenModal = (id) => {
  arr.forEach((el) => {
    if (el.id == id) {
      modalTitle.value = el.title;
      modalContent.value = el.content;
    }
  });
};
</script>

<template>
      <div class="m-5 mb-5">
      <BaseBlock title="Редактировать рекламу">
        <template #content>
          <video
            width="100%"
            height="100%"
            :src="ad.url"
            controls
            frameborder="0"
          ></video>
          <form @submit.prevent="handleSubmit" class="row g-3 m-2 mb-5">
            <div class="col-md-6 mb-3">
              <label for="filename" class="form-label">Название файла</label>
              <input
                type="text"
                class="form-control"
                id="filename"
                v-model="ad.filename"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="serverFilename" class="form-label">Имя файла на сервере</label>
              <input
                type="text"
                class="form-control"
                id="serverFilename"
                v-model="ad.serverfilename"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="userId" class="form-label">ID пользователя</label>
              <input
                type="number"
                class="form-control"
                id="userId"
                v-model="ad.userid"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="duration" class="form-label">Длительность</label>
              <input
                type="text"
                class="form-control"
                id="duration"
                v-model="ad.duration"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="url" class="form-label">URL</label>
              <input
                type="url"
                class="form-control"
                id="url"
                v-model="ad.url"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="mainLocation" class="form-label">Основное местоположение</label>
              <input
                type="number"
                class="form-control"
                id="mainLocation"
                v-model="ad.mainlocation"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="status" class="form-label">Включено</label>
              <select class="form-control" id="status" v-model="ad.status">
                <option :value="1">Да</option>
                <option :value="0">Нет</option>
              </select>
            </div>
            <div class="row text-center p-3">
              <RemoveData :path="'videos/' + ad.id"></RemoveData>
              <EditData :path="'videos/' + ad.id" :data="ad"></EditData>
            </div>
          </form>
        </template>
      </BaseBlock>
    </div>
  <!-- Hero -->
  <div class="video content w-75 h-50">
    <div
      class="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center py-2 text-center text-md-start"
    >
      <div class="flex-grow-1 mb-1 mb-md-0">
        <BaseBlock title="Видео" class="">
          <video controls="" class="w-100"></video>
          <a
            @click="handleShowBtn"
            target="_blank"
            :href="url"
            class="btn w-100 btn-primary my-2"
          >
            <i>
              Посетить сайт рекламодателя
            </i>
          </a>
          <div class="mt-3 mb-4">
            <input
              type="text"
              class="form-control form-control-alt form-control-lg"
              placeholder="Коментарий"
              v-model="comment"
            />
          </div>
          <div class="mb-4">
            <div v-if="selectedCheckboxes.length > 0">
              <button
                @click="printSelectedCheckboxes"
                type="submit"
                class="btn w-100 btn-alt-primary"
              >
                <i class=""></i>
                Отклонить
              </button>
            </div>
            <button
              v-else
              :disabled="isShowBtn"
              type="submit"
              class="btn w-100 btn-primary"
            >
              <i class=""></i>
              Принять
            </button>
          </div>
        </BaseBlock>
      </div>
    </div>
  </div>
  <!-- END Hero -->

  <!-- Page Content -->
  <div class="content mt-0">
    <!-- Overview -->
    <div class="row items-push">
      <div class="col-sm-6 col-xxl-3">
        <!-- Pending Orders -->
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-5 fw-bold">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="0"
                      v-model="selectedCheckboxes"
                    />
                    <label class="form-check-label" for="login-remember"
                      >+18 контент</label
                    >
                  </div>
                </dt>
                <dd
                  class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0"
                ></dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i class="far fa-gem fs-3 text-primary"></i>
              </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <button
                @click="handleOpenModal(1)"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style="background: rgb(246, 247, 249); color: rgb(35, 86, 215)"
                class="block-content block-content-full block-content-sm fs-sm fw-medium border-0 d-flex align-items-center justify-content-between"
              >
                <span>More info</span>
                <i
                  class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"
                ></i>
              </button>
            </div>
          </template>
        </BaseBlock>
        <!-- END Pending Orders -->
      </div>

      <div class="col-sm-6 col-xxl-3">
        <!-- New Customers -->
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-5 fw-bold">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="1"
                      v-model="selectedCheckboxes"
                    />
                    <label class="form-check-label" for="login-remember"
                      >Насилие</label
                    >
                  </div>
                </dt>
                <dd
                  class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0"
                ></dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i class="far fa-user-circle fs-3 text-primary"></i>
              </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <button
                @click="handleOpenModal(2)"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style="background: rgb(246, 247, 249); color: rgb(35, 86, 215)"
                class="block-content block-content-full block-content-sm fs-sm fw-medium border-0 d-flex align-items-center justify-content-between"
              >
                <span>More info</span>
                <i
                  class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"
                ></i>
              </button>
            </div>
          </template>
        </BaseBlock>
        <!-- END New Customers -->
      </div>
      <div class="col-sm-6 col-xxl-3">
        <!-- Messages -->
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-5 fw-bold">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="2"
                      v-model="selectedCheckboxes"
                    />
                    <label class="form-check-label" for="login-remember"
                      >Провокации</label
                    >
                  </div>
                </dt>
                <dd
                  class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0"
                ></dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i class="far fa-paper-plane fs-3 text-primary"></i>
              </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <button
                @click="handleOpenModal(3)"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style="background: rgb(246, 247, 249); color: rgb(35, 86, 215)"
                class="block-content block-content-full block-content-sm fs-sm fw-medium border-0 d-flex align-items-center justify-content-between"
              >
                <span>More info</span>
                <i
                  class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"
                ></i>
              </button>
            </div>
          </template>
        </BaseBlock>
        <!-- END Messages -->
      </div>
      <div class="col-sm-6 col-xxl-3">
        <!-- Conversion Rate -->
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-5 fw-bold">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="3"
                      v-model="selectedCheckboxes"
                    />
                    <label class="form-check-label" for="login-remember"
                      >Религия</label
                    >
                  </div>
                </dt>
                <dd
                  class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0"
                ></dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i class="fa fa-chart-bar fs-3 text-primary"></i>
              </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <button
                @click="handleOpenModal(4)"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style="background: rgb(246, 247, 249); color: rgb(35, 86, 215)"
                class="block-content block-content-full block-content-sm fs-sm fw-medium border-0 d-flex align-items-center justify-content-between"
              >
                <span>More info</span>
                <i
                  class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"
                ></i>
              </button>
            </div>
          </template>
        </BaseBlock>
        <!-- END Conversion Rate-->
      </div>
      <div class="col-sm-6 col-xxl-3">
        <!-- Conversion Rate -->
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-5 fw-bold">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="4"
                      v-model="selectedCheckboxes"
                    />
                    <label class="form-check-label" for="login-remember"
                      >Запрещенные вещества</label
                    >
                  </div>
                </dt>
                <dd
                  class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0"
                ></dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i class="fa fa-chart-bar fs-3 text-primary"></i>
              </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <button
                @click="handleOpenModal(5)"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style="background: rgb(246, 247, 249); color: rgb(35, 86, 215)"
                class="block-content block-content-full block-content-sm fs-sm fw-medium border-0 d-flex align-items-center justify-content-between"
              >
                <span>More info</span>
                <i
                  class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"
                ></i>
              </button>
            </div>
          </template>
        </BaseBlock>
        <!-- END Conversion Rate-->
      </div>
      <div class="col-sm-6 col-xxl-3">
        <!-- Conversion Rate -->
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-5 fw-bold">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="5"
                      v-model="selectedCheckboxes"
                    />
                    <label class="form-check-label" for="login-remember"
                      >Размер видео</label
                    >
                  </div>
                </dt>
                <dd
                  class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0"
                ></dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i class="fa fa-chart-bar fs-3 text-primary"></i>
              </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <button
                @click="handleOpenModal(6)"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style="background: rgb(246, 247, 249); color: rgb(35, 86, 215)"
                class="block-content block-content-full block-content-sm fs-sm fw-medium border-0 d-flex align-items-center justify-content-between"
              >
                <span>More info</span>
                <i
                  class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"
                ></i>
              </button>
            </div>
          </template>
        </BaseBlock>
        <!-- END Conversion Rate-->
      </div>
      <div class="col-sm-6 col-xxl-3">
        <!-- Conversion Rate -->
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-5 fw-bold">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="6"
                      v-model="selectedCheckboxes"
                    />
                    <label class="form-check-label" for="login-remember"
                      >Качество видео</label
                    >
                  </div>
                </dt>
                <dd
                  class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0"
                ></dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i class="fa fa-chart-bar fs-3 text-primary"></i>
              </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <button
                @click="handleOpenModal(7)"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style="background: rgb(246, 247, 249); color: rgb(35, 86, 215)"
                class="block-content block-content-full block-content-sm fs-sm fw-medium border-0 d-flex align-items-center justify-content-between"
              >
                <span>More info</span>
                <i
                  class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"
                ></i>
              </button>
            </div>
          </template>
        </BaseBlock>
        <!-- END Conversion Rate-->
      </div>
      <div class="col-sm-6 col-xxl-3">
        <!-- Conversion Rate -->
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-5 fw-bold">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="7"
                      v-model="selectedCheckboxes"
                    />
                    <label class="form-check-label" for="login-remember"
                      >Проблема ссылки</label
                    >
                  </div>
                </dt>
                <dd
                  class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0"
                ></dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i class="fa fa-chart-bar fs-3 text-primary"></i>
              </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <button
                @click="handleOpenModal(8)"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style="background: rgb(246, 247, 249); color: rgb(35, 86, 215)"
                class="block-content block-content-full block-content-sm fs-sm fw-medium border-0 d-flex align-items-center justify-content-between"
              >
                <span>More info</span>
                <i
                  class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"
                ></i>
              </button>
            </div>
          </template>
        </BaseBlock>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-8 col-xxl-9 d-flex flex-column">
      </div>
      <div class="col-xl-4 col-xxl-3 d-flex flex-column">
        <div class="row items-push flex-grow-1">
          <div class="col-xl-12">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            {{ modalTitle }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>{{ modalContent }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
