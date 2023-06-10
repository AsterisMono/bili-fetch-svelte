export type StaticMessage = {
	content: string;
};

export type ClickableMessage = {
	content: string;
	onClick: () => void;
};

export type Message = StaticMessage | ClickableMessage;
