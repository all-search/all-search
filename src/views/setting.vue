<template>
  <v-card
    class="mx-auto">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>菜单方向</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-radio-group
          v-model="mode"
          row
        >
          <v-radio
            label="竖向"
            value="vertical"
          />
          <v-radio
            label="横向"
            value="horizontal"
          />
        </v-radio-group>
      </v-list-item-action>
    </v-list-item>
  </v-card>
</template>

<script>

export default {
  name: 'setting',
  data: () => ({
    mode: 'vertical'
  })
}
</script>
<style>

</style>
