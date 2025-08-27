"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download } from "lucide-react"
import { OFFICES, DEFAULT_SIGNATURE_DATA, COMPANY_LINKS, type IOffice } from "@/lib/constants"

interface ISignatureData {
  name: string
  title: string
  phone: string
  office: string
  primaryCTAText: string
  primaryCTAUrl: string
  secondaryCTAText: string
  secondaryCTAUrl: string
  compactMode: boolean
}

const IMAGES = {
  phone: "https://paveddigital.com/images/signature-icons/phone-icon.png",
  address: "https://paveddigital.com/images/signature-icons/address-icon.png",
  linkedIn: 'https://paveddigital.com/images/signature-icons/linkedin.png'
}

export default function EmailSignatureGenerator() {
  const [signatureData, setSignatureData] = useState<ISignatureData>(DEFAULT_SIGNATURE_DATA)
  const previewRef = useRef<HTMLDivElement>(null)

  const updateField = (field: keyof ISignatureData, value: string | boolean) => {
    setSignatureData((prev: ISignatureData) => ({ ...prev, [field]: value }))
  }

  const getCurrentOffice = (): IOffice => {
    return OFFICES.find(office => office.id === signatureData.office) || OFFICES[0]
  }

  const getOfficeAddress = (): string => {
    return getCurrentOffice().address
  }

  const getOfficeMapLink = (): string => {
    return getCurrentOffice().mapLink
  }



  const downloadSignature = () => {
    if (previewRef.current) {
      const html = previewRef.current.innerHTML
      const blob = new Blob([html], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${signatureData.name.replace(/\s+/g, "_")}_email_signature.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const renderSignatureSection = () => {
    return <div ref={previewRef}>
      <table cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse', fontSize: '14px', width: '100%', maxWidth: '600px', fontFamily: 'Arial, Helvetica, sans-serif', boxSizing: 'border-box' }}>
        <tbody>
          <tr>
            {/* Left Column - Personal Info */}
            <td style={{ verticalAlign: 'top', padding: signatureData.compactMode ? '8px 8px 0 0' : '16px 16px 0 0', width: '60%' }}>
              {/* Name and Title */}
              <div style={{ marginBottom: signatureData.compactMode ? '0' : '12px' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0', letterSpacing: '0.05em' }}>
                  {signatureData.name}
                </div>
                <div style={{ fontSize: '14px', margin: '0', letterSpacing: '0.02em' }}>
                  {signatureData.title}
                </div>
              </div>

              {/* Contact Info */}
              <div style={{ margin: signatureData.compactMode ? '0' : '8px 0' }}>
                {/* Phone */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: signatureData.compactMode ? '0' : '8px' }}>
                  <img src={IMAGES.phone} alt="Phone" style={{ width: '16px', marginRight: signatureData.compactMode ? '4px' : '8px' }} />
                  <a href={`tel:${signatureData.phone}`} style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                    {signatureData.phone}
                  </a>
                </div>

                {/* Address - only show in non-compact mode */}
                {!signatureData.compactMode && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={IMAGES.address} alt="Location" style={{ width: '16px', marginRight: '8px' }} />
                    <a href={getOfficeMapLink()}
                      style={{
                        textDecoration: 'underline',
                        color: '#000',
                        cursor: 'pointer',
                        height: '20px',
                      }}
                      target="_blank"
                      rel="noopener noreferrer">
                      {getOfficeAddress()}
                    </a>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div style={{ marginTop: signatureData.compactMode ? '8px' : '16px' }}>
                {signatureData.primaryCTAText && (
                  <a href={signatureData.primaryCTAUrl} style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    background: '#107569',
                    color: 'white',
                    fontSize: '12px',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                  }}>
                    {signatureData.primaryCTAText}
                  </a>
                )}
                {!signatureData.compactMode && signatureData.secondaryCTAText && (
                  <a href={signatureData.secondaryCTAUrl} style={{
                    marginLeft: signatureData.compactMode ? '0' : '8px',
                    color: '#000',
                    textDecoration: 'underline',
                    height: '20px',
                  }}>
                    {signatureData.secondaryCTAText} {'>'}
                  </a>
                )}
              </div>
            </td>

            {/* Divider */}
            <td style={{ width: 1, backgroundColor: '#374151', padding: '0 1px' }}></td>

            {/* Right Column - Company Info */}
            <td style={{ verticalAlign: 'top', padding: signatureData.compactMode ? '8px' : '16px', textAlign: 'left', width: '40%' }}>
              {/* Logo */}
              <div style={{ marginBottom: signatureData.compactMode ? '8px' : '16px' }}>
                <a href={COMPANY_LINKS.website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <img
                    src="https://paveddigital.com/images/logo/logo-cropped.png"
                    alt="Paved Digital"
                    style={{
                      width: signatureData.compactMode ? '100px' : '130px',
                      display: 'block'
                    }}
                  />
                </a>
              </div>

              {/* Website */}
              <div style={{ marginBottom: signatureData.compactMode ? '4px' : '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                  <img
                    src="https://paveddigital.com/favicon-16x16.png"
                    alt="Paved Digital"
                    style={{
                      width: '16px',
                      height: '16px',
                      marginRight: signatureData.compactMode ? '4px' : '8px'
                    }}
                  />
                  <a href={COMPANY_LINKS.website} style={{
                    textDecoration: 'underline',
                    color: '#000'
                  }}>
                    paveddigital.com
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div style={{ marginBottom: signatureData.compactMode ? '0' : '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                  <img
                    src={IMAGES.linkedIn}
                    alt="LinkedIn"
                    style={{
                      width: '16px',
                      height: '16px',
                      marginRight: signatureData.compactMode ? '4px' : '8px'
                    }}
                  />
                  <a href={COMPANY_LINKS.linkedin} style={{
                    textDecoration: 'underline',
                    fontSize: 14,
                    color: '#000'
                  }}>
                    Follow us on LinkedIn
                  </a>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Email Signature Generator</h1>
        <p className="text-red-600 text-center mb-8">* Open your downloaded html file in Chrome browser, press Ctrl+A to select the content then copy (Ctrl+C) and paste (Ctrl+V) to your outlook signature editor.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <Card>
            <CardHeader>
              <CardTitle>Signature Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-black">
                  <span className="text-red-600 mr-1">*</span>
                  NAME
                </Label>
                <Input
                  id="name"
                  value={signatureData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="title" className="text-black">
                    <span className="text-red-600 mr-1">*</span>
                    TITLE
                  </Label>
                  <Input
                    id="title"
                    value={signatureData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    placeholder="Enter your job title"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-black">
                    <span className="text-red-600 mr-1">*</span>
                    PHONE
                  </Label>
                  <Input
                    id="phone"
                    value={signatureData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="Enter your phone number"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="office" className="text-black">
                    <span className="text-red-600 mr-1">*</span>
                    OFFICE ADDRESS
                  </Label>
                  <Select
                    value={signatureData.office}
                    onValueChange={(value: string) => updateField("office", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select office location" />
                    </SelectTrigger>
                    <SelectContent>
                      {OFFICES.map((office) => (
                        <SelectItem key={office.id} value={office.id}>
                          {office.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="primaryCTAText" className="text-black">
                  Primary CTA
                </Label>
                <Input
                  id="primaryCTAText"
                  value={signatureData.primaryCTAText}
                  onChange={(e) => updateField("primaryCTAText", e.target.value)}
                  placeholder="Button text (e.g., BOOK MEETING)"
                  className="mt-1 mb-2"
                />
                <Input
                  value={signatureData.primaryCTAUrl}
                  onChange={(e) => updateField("primaryCTAUrl", e.target.value)}
                  placeholder="Button URL"
                />
              </div>

              <div>
                <Label htmlFor="secondaryCTAText" className="text-black">
                  Secondary CTA
                </Label>
                <Input
                  id="secondaryCTAText"
                  value={signatureData.secondaryCTAText}
                  onChange={(e) => updateField("secondaryCTAText", e.target.value)}
                  placeholder="Button text (e.g., View LinkedIn)"
                  className="mt-1 mb-2"
                />
                <Input
                  value={signatureData.secondaryCTAUrl}
                  onChange={(e) => updateField("secondaryCTAUrl", e.target.value)}
                  placeholder="Button URL"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="compactMode"
                  type="checkbox"
                  checked={signatureData.compactMode}
                  onChange={(e) => updateField("compactMode", e.target.checked)}
                />
                <Label htmlFor="compactMode" className="text-black">Compact Mode</Label>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-red-600 mb-3">This needs to be changed inside Vercel Variables</h3>

                <div>
                  <Label htmlFor="website" className="text-black">
                    Company Website
                  </Label>
                  <Input
                    id="website"
                    value={COMPANY_LINKS.website}
                    disabled
                    className="mt-1 bg-gray-100"
                  />
                </div>

                <div className="mt-4">
                  <Label htmlFor="linkedin" className="text-black">
                    Company LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    value={COMPANY_LINKS.linkedin}
                    disabled
                    className="mt-1 bg-gray-100"
                  />
                </div>
              </div>

            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Live Preview</CardTitle>
                <Button onClick={downloadSignature} size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-white border rounded-lg">
                {renderSignatureSection()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
