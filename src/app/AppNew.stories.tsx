import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";


import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import {App} from "./App";

export default {
    title: 'App',
    components: App,
    decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>

export const AppNewExample: ComponentStory<typeof App> = () =><App/>;
