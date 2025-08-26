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
            <td style={{ verticalAlign: 'top', padding: signatureData.compactMode ? '8px 8px 8px 0' : '16px 16px 16px 0', width: '60%' }}>
              <table cellPadding="0" cellSpacing="0" border={0} style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0', letterSpacing: '0.05em', padding: '0' }}>{signatureData.name}</td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: '14px', margin: '0 0 12px 0', letterSpacing: '0.02em', padding: '0' }}>{signatureData.title}</td>
                  </tr>
                </tbody>
              </table>

              <table cellPadding="0" cellSpacing="0" border={0} style={{ margin: signatureData.compactMode ? '0' : '16px 0' }}>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: 'middle' }}>
                      <table cellPadding="0" cellSpacing="0" border={0}>
                        <tbody>
                          <tr>
                            <td style={{ verticalAlign: 'middle', paddingRight: signatureData.compactMode ? '4px' : '8px' }}>
                              <img src="https://paveddigital.com/icons/phone-icon.svg" alt="Phone" style={{ verticalAlign: 'middle', width: '16px' }} />
                            </td>
                            <td style={{ verticalAlign: 'middle' }}>
                              <a href={`tel:${signatureData.phone}`} style={{ textDecoration: 'none', color: '#000' }}>{signatureData.phone}</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  {!signatureData.compactMode && (
                    <tr>
                      <td style={{ verticalAlign: 'middle' }}>
                        <table cellPadding="0" cellSpacing="0" border={0}>
                          <tbody>
                            <tr>
                              <td style={{ verticalAlign: 'middle', paddingRight: signatureData.compactMode ? '4px' : '8px' }}>
                                <img src="https://paveddigital.com/icons/address-icon.svg" alt="Location" style={{ verticalAlign: 'middle', width: '16px' }} />
                              </td>
                              <td style={{ verticalAlign: 'middle' }}>
                                <a href={getOfficeMapLink()} style={{ textDecoration: 'none', color: '#000' }} target="_blank" rel="noopener noreferrer">{getOfficeAddress()}</a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <table cellPadding="0" cellSpacing="0" border={0} style={{ marginTop: signatureData.compactMode ? '8px' : '16px' }}>
                <tbody>
                  <tr>
                    {signatureData.primaryCTAText && (
                      <td style={{ paddingRight: '8px' }}>
                        <a href={signatureData.primaryCTAUrl} style={{ display: 'inline-block', padding: '8px 16px', background: '#107569', color: 'white', textDecoration: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}>{signatureData.primaryCTAText}</a>
                      </td>
                    )}
                    {!signatureData.compactMode && signatureData.secondaryCTAText && (
                      <td>
                        <a href={signatureData.secondaryCTAUrl} style={{ color: '#374151', textDecoration: 'underline', fontSize: '12px' }}>{signatureData.secondaryCTAText} {'>'}</a>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </td>

            <td style={{ width: 1, backgroundColor: '#374151', padding: '0 1px' }}></td>

            <td style={{ verticalAlign: 'top', padding: signatureData.compactMode ? '8px' : '16px', textAlign: 'left', width: '40%' }}>
              <table cellPadding="0" cellSpacing="0" border={0} style={{ width: '100%', marginBottom: signatureData.compactMode ? '8px' : '16px' }}>
                <tbody>
                  <tr>
                    <td>
                      <a href={COMPANY_LINKS.website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <img src="https://paveddigital.com/images/logo/logo-cropped.png" alt="Paved Digital" style={{ width: signatureData.compactMode ? '100px' : '130px', display: 'block' }} />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table cellPadding="0" cellSpacing="0" border={0} style={{ width: '100%', margin: signatureData.compactMode ? '4px 0' : '8px 0' }}>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: 'middle' }}>
                      <table cellPadding="0" cellSpacing="0" border={0}>
                        <tbody>
                          <tr>
                            <td style={{ paddingRight: signatureData.compactMode ? '4px' : '8px' }}>
                              <img src="https://paveddigital.com/favicon-16x16.png" alt="Paved Digital" style={{ width: '16px', height: '16px', verticalAlign: 'middle' }} />
                            </td>
                            <td style={{ verticalAlign: 'middle' }}>
                              <a href={COMPANY_LINKS.website} style={{ textDecoration: 'underline', fontSize: 14, color: '#000' }}>
                                paveddigital.com
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table cellPadding="0" cellSpacing="0" border={0} style={{ width: '100%', margin: signatureData.compactMode ? '0' : '8px 0' }}>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: 'middle' }}>
                      <table cellPadding="0" cellSpacing="0" border={0}>
                        <tbody>
                          <tr>
                            <td style={{ paddingRight: signatureData.compactMode ? '4px' : '8px' }}>
                              <img style={{ width: '16px', height: '16px', verticalAlign: 'middle' }} src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMGU5Mzg0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBkPSJNMjkuNjMxMyAwSDIuMzYyNUMxLjA1NjI1IDAgMCAxLjAzMTI1IDAgMi4zMDYyNVYyOS42ODc1QzAgMzAuOTYyNSAxLjA1NjI1IDMyIDIuMzYyNSAzMkgyOS42MzEzQzMwLjkzNzUgMzIgMzIgMzAuOTYyNSAzMiAyOS42OTM4VjIuMzA2MjVDMzIgMS4wMzEyNSAzMC45Mzc1IDAgMjkuNjMxMyAwWk05LjQ5Mzc1IDI3LjI2ODdINC43NDM3NVYxMS45OTM3SDkuNDkzNzVWMjcuMjY4N1pNNy4xMTg3NSA5LjkxMjVDNS41OTM3NSA5LjkxMjUgNC4zNjI1IDguNjgxMjUgNC4zNjI1IDcuMTYyNUM0LjM2MjUgNS42NDM3NSA1LjU5Mzc1IDQuNDEyNSA3LjExODc1IDQuNDEyNUM4LjYzNzUgNC40MTI1IDkuODY4NzUgNS42NDM3NSA5Ljg2ODc1IDcuMTYyNUM5Ljg2ODc1IDguNjc1IDguNjM3NSA5LjkxMjUgNy4xMTg3NSA5LjkxMjVaTTI3LjI2ODcgMjcuMjY4N0gyMi41MjVWMTkuODQzOEMyMi41MjUgMTguMDc1IDIyLjQ5MzcgMTUuNzkzNyAyMC4wNTYyIDE1Ljc5MzdDMTcuNTg3NSAxNS43OTM3IDE3LjIxMjUgMTcuNzI1IDE3LjIxMjUgMTkuNzE4OFYyNy4yNjg3SDEyLjQ3NVYxMS45OTM3SDE3LjAyNVYxNC4wODEzSDE3LjA4NzVDMTcuNzE4OCAxMi44ODEzIDE5LjI2ODggMTEuNjEyNSAyMS41NzUgMTEuNjEyNUMyNi4zODEzIDExLjYxMjUgMjcuMjY4NyAxNC43NzUgMjcuMjY4NyAxOC44ODc1VjI3LjI2ODdaIj48L3BhdGg+PC9zdmc+" alt="LinkedIn" />
                            </td>
                            <td style={{ verticalAlign: 'middle' }}>
                              <a href={COMPANY_LINKS.linkedin} style={{ textDecoration: 'underline', fontSize: 14, color: '#000' }}>
                                Follow us on LinkedIn
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
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
