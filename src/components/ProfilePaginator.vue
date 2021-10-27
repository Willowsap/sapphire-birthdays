<template>
  <nav class="paginator">
    <ul class="buttonList">
      <button
        v-for="buttonNum in numButtons"
        :key="buttonNum"
        @click="goToPage(buttonNum)"
        :class="{ pageButton: true, activePage: buttonNum === page }"
      >
        {{ buttonNum }}
      </button>
    </ul>
    <section class="numSelection">
      <label for="perPage">Items Per Page</label>
      <input
        type="number"
        name="perPage"
        id="perPage"
        v-model="numPerPage"
        @input="goToPage(page)"
        min="1"
        :max="numItems"
      />
    </section>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfilePaginator",
  emits: ["onChange"],
  props: {
    items: {
      type: Array,
      required: true,
    },
    perPage: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      page: 1,
      numPerPage: this.perPage,
    };
  },
  computed: {
    numItems() {
      return this.items.length;
    },
    numButtons() {
      return Math.ceil(this.numItems / this.numPerPage);
    },
    pageItems() {
      const startIndex = this.numPerPage * (this.page - 1);
      const endIndex =
        startIndex +
        (this.numPerPage > this.numItems ? this.numItems : this.numPerPage);
      return this.items.slice(startIndex, endIndex);
    },
  },
  watch: {
    items() {
      this.goToPage(1);
    },
  },
  methods: {
    getItemsInPage() {
      const startIndex = this.numPerPage * this.page;
      const endIndex = startIndex + this.numPerPage;
      return this.items.slice(startIndex, endIndex);
    },
    goToPage(pageNum: number) {
      if (pageNum > this.numButtons) {
        this.page = this.numButtons;
      } else {
        this.page = pageNum;
      }
      this.$emit("onChange", this.pageItems);
    },
  },
  mounted() {
    this.goToPage(this.page);
  },
});
</script>

<style scoped>
.paginator {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}
.numSelection {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.buttonList {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
}
.pageButton {
  font-family: "Zen Kurenaido", sans-serif;
  background-color: white;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px;
  border-style: solid;
  border-color: #968298;
  margin: 2px;
}
.pageButton:hover {
  cursor: pointer;
  background-color: #968298;
  border: 1px;
  border-style: solid;
  border-color: white;
}
input[type="number"] {
  font-family: "Zen Kurenaido", sans-serif;
  border: none;
  margin-left: 5px;
  width: 40px;
  height: 20px;
}
.activePage {
  background-color: #968298;
  border: 1px;
  border-style: solid;
  border-color: white;
}
</style>
