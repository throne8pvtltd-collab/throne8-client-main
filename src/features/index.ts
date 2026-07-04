
import Navigation from "./mentorship/components/layout/Navigation"
import Sidebar from "./mentorship/components/layout/Sidebar"
import ActionCardsSection from "./mentorship/components/sections/ActionCardsSection"
import MentorCard from "./mentorship/modals/MentorCard"
import MasterclassesSection from "./mentorship/components/sections/MasterclassesSection"
import MentorDiscoverySection from "./mentorship/components/sections/MentorDiscoverySection"
import MentorMarqueeSection from "./mentorship/components/sections/MentorMarqueeSection"
import CompanyLogosSection from "./mentorship/components/sections/CompanyLogosSection"
import SlotPickerSection from "./mentorship/components/sections/SlotPickerSection"
import UpcomingMasterclassesSection from "./mentorship/components/sections/UpcomingMasterclassesSection"
import OurImpactSection from "./mentorship/components/sections/OurImpactSection"
import UnstoppableAdvantageSection from "./mentorship/components/sections/UnstoppableAdvantageSection"
import CTASection from "./mentorship/components/sections/CTASection"
import FAQSection from "./mentorship/components/sections/FAQSection"
import BecomeMentorModal from "./mentorship/modals/BecomeMentorModal"
import GlobalStyles from "./mentorship/modals/GlobalStyles"
import CompareBar from "./mentorship/modals/CompareBar"
import ActionCardsSectionProps from "./mentorship/components/sections/ActionCardsSection"

import {
    Mentor,
    SessionType,
    Masterclass,
    UpcomingMasterclass,
    Company,
    FAQ,
    GradientColor
} from "./mentorship/types"
import HeroSection from "./mentorship/components/sections/HeroSection"
import { FAQS, GRADIENT_COLORS, MASTERCLASSES, MENTORS, SESSION_TYPES, TOP_COMPANIES, TOP_COMPANIES_ROW2, UPCOMING_MASTERCLASSES,  } from "./mentorship/constants/mock.data"

export {
    Navigation,
    MENTORS, 
    FAQS,
    SESSION_TYPES,
    MASTERCLASSES,
    UPCOMING_MASTERCLASSES,
    TOP_COMPANIES,
    TOP_COMPANIES_ROW2,
    GRADIENT_COLORS,
    
    Sidebar,
    ActionCardsSection,
    ActionCardsSectionProps,
    MentorMarqueeSection,
    MentorDiscoverySection,
    MentorCard,
    BecomeMentorModal,
    GlobalStyles,
    CompanyLogosSection,
    SlotPickerSection,
    MasterclassesSection,
    UpcomingMasterclassesSection,
    OurImpactSection,
    UnstoppableAdvantageSection,
    CTASection,
    FAQSection,
    CompareBar,
    HeroSection
}

export type {
    Mentor,
    SessionType,
    Masterclass,
    UpcomingMasterclass,
    Company,
    FAQ,
    GradientColor
}






