<template>

  <input style="width: 150px" type="text" size="10" maxlength="10"
         v-bind:value="value"
         v-on:input="$emit('input', $event.target.value)">

</template>

<script>
  export default {
    name: 'datetimepicker',
    props: ['value'],
    mounted: function () {
      // activate the plugin when the component is mounted.
      $(this.$el).datetimepicker({
        timepicker: false,
        format: "d/m/Y",
        onSelectDate: this.onSelectDate
      });
    },
    methods: {
      // callback for when the selector popup is closed.
      onSelectDate(date) {
        var strDate = ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear();
        this.$emit('input', strDate) //maybe you need to validate something here? Dont knwo the plugin well enough.
      }
    },
    watch: {
      // when the value fo the input is changed from the parent,
      // the value prop will update, and we pass that updated value to the plugin.
//      value(newDate) {
//        var strDate = ("0" + newDate.getDate()).slice(-2) + "/" + ("0" + (newDate.getMonth() + 1)).slice(-2) + "/" + newDate.getFullYear();
//        debugger
//        $(this.el).datetimepicker('setDate', strDate);
//      }
    }
  }
</script>
