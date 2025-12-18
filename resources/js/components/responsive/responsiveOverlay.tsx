/* Used for a responsive Overlay, either a Dialog or a Drawer */

import { 
    Dialog, DialogContent, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";

import {
    Drawer, DrawerContent, DrawerHeader, DrawerTitle
} from '@/components/ui/drawer'

import useMediaQuery from '@/components/responsive/useMediaQuery'

export default function ResponsiveOverlay ({
    open,
    onOpenChange,
    title,
    children
}:{
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    children: React.ReactNode
}) {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if(isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                </DrawerHeader>
                {children}
            </DrawerContent>
        </Drawer>
    )
}