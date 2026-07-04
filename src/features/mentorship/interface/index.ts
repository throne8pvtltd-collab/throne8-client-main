import { TabId } from "../types";

export interface Tab {
    id: TabId;
    label: string;
}

export interface Query {
    initials: string;
    name: string;
    time: string;
    text: string;
    tags: string[];
    answered: boolean;
}

export interface Resource {
    icon: string;
    type: string;
    name: string;
    meta: string;
    btn: string;
    action: string;
}

export interface SessionHistory {
    name: string;
    date: string;
    stars: number;
}

export interface ToastProps {
    msg: string;
    visible: boolean;
}

export interface ReminderModalProps {
    sessionName: string;
    onClose: () => void;
    onSave: (time: string) => void;
}

export interface StatCardProps {
    num: string;
    label: string;
}

export interface ProgressBarProps {
    value: number;
    label: string;
}

export interface OneOnOneTabProps {
    onReminder: (sessionName: string, onSave: () => void) => void;
}

export interface QueriesTabProps {
    toast: (msg: string) => void;
}

export interface ResourcesTabProps {
    toast: (msg: string) => void;
}

export interface ModalState {
    open: boolean;
    session: string;
    onSave: (() => void) | null;
}

export interface UpcomingSession {
    id: string;
    name: string;
    date: string;
    set: boolean;
}

export interface BookableSession {
    icon: string;
    name: string;
    mentor: string;
    match: number;
}
