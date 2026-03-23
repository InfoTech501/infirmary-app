import Header from '@/components/Header';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { QrCodeCard } from '@/components/QrCodeCard';
import React from 'react';

export default function QRParentsPortal() {
    return (
        <ScreenWrapper>
            <Header title="PARENT'S PORTAL" />
            <QrCodeCard />
        </ScreenWrapper>
    );
}
