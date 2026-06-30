import React from 'react'
import SettingsProfile from './SettingItems/SettingProfile'
import AppearanceCard from './SettingItems/AppearanceCard'
import DataManagement from './SettingItems/DataManagement'
import AboutApplication from './SettingItems/AboutApplication'

export default function Setting() {
    return (
        <>
            <div className="grid lg:grid-cols-2 gap-6">
                <SettingsProfile />
                <AppearanceCard />
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
                <DataManagement />
                <AboutApplication />
            </div>
        </>
    )
}
