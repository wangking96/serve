<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div
        class="TextInput"
        :class="{ 'has-error': !!errorMessage, success: meta.valid }"
    >
        <label :for="name">{{ label }}</label>
        <input
            :type="type"
            :value="value"
            :id="name"
            :maxlength="maxlength"
            :placeholder="placeholder"
            @blur="handleBlur"
            @input="handleChange"
        />

        <p class="help-message" v-show="errorMessage || meta.valid">
            {{ errorMessage || successMessage }}
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useField } from 'vee-validate';

export default defineComponent({
    name: 'Finput',
    props: {
        label: {
            type: String,
            required: true,
        },
        maxlength: {
            type: String,
            required: false,
        },
        placeholder: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            required: true,
        },
        successMessage: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        const {
            errorMessage,
            value,
            handleChange,
            handleBlur,
            meta,
        } = useField(props.name, undefined, {
            initialValue: props.value,
        });

        return {
            handleChange,
            handleBlur,
            errorMessage,
            value,
            meta,
        };
    },
});
</script>
<style scoped lang="scss">
.TextInput {
    position: relative;
    margin-bottom: calc(1em * 1.5);
    width: 100%;
    label {
        display: block;
        margin-bottom: 4px;
        width: 100%;
    }

    input {
        border-radius: 5px;
        border: 2px solid transparent;
        padding: 15px 10px;
        outline: none;
        background-color: #f2f5f7;
        width: 100%;
        transition: border-color 0.3s ease-in-out, color 0.3s ease-in-out,
            background-color 0.3s ease-in-out;
        margin-bottom: 20px;
    }

    input:focus {
        border-color: $primary-color;
    }

    .help-message {
        position: absolute;
        bottom: calc(-1.5 * 1em);
        left: 0;
        margin: 0;
        font-size: 14px;
        height: 30px;
        text-align: left;
        color: $error-color;
    }

    &.has-error input {
        background-color: $error-bg-color;
        color: $error-color;
    }

    &.has-error input:focus {
        border-color: $error-color;
    }

    & .has-error .help-message {
        color: $error-color;
    }

    &.success input {
        background-color: $success-bg-color;
        color: $success-color;
    }

    &.success input:focus {
        border-color: $success-color;
    }

    &.success .help-message {
        color: $success-color;
    }
}
</style>
