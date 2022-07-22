import {AddFormItem} from "./AddFormItem";
import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    title:'AddFormItem',
    components:AddFormItem,
} as ComponentMeta<typeof AddFormItem>

const callback = action('Button')
export const AddFormItemBaseExample: ComponentStory<typeof AddFormItem> = () => <AddFormItem addItem={callback} />;
