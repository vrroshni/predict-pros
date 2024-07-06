import { Contact, LayoutDashboard, Settings, Sparkles, UserRoundSearch } from 'lucide-react'

export const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500"
    },
    {
        label: "Find Our Pro",
        icon: UserRoundSearch,
        href: "/find-our-pro",
        color: "text-violet-500"
    }
    ,
    {
        label: "Our Pros",
        icon: UserRoundSearch,
        href: "/our-pros",
        color: "text-emerald-500"
    }
    ,
]

export const tools = [{
    label: "Find Our Pros",
    icon: Sparkles,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/find-our-pro"

},
{
    label: "See Our Pros",
    icon: Contact,
    color: "text-green-500",
    bgColor: "bg-emerald-500/10",
    href: "/our-pros"

},
]

export const valuesList=["Adaptability", "Transparency", "Collaborative", "Innovative", "Accountability"]
export const valuesListHomepage=["New", "Reliable ", "Open ", "Adaptable "]