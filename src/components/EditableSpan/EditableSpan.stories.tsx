
import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";

export default {
    title:'EditableSpan',
    components:EditableSpan,
} as ComponentMeta<typeof EditableSpan>

const onChangeCallback = action('EditableSpan want to changed')
export const AditableSpanBaseExample: ComponentStory<typeof EditableSpan> = () => <EditableSpan  onChange={onChangeCallback} title={'EditableSpan'}/>;
