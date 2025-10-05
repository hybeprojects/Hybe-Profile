"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Users, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface AdminProfile {
  id: number
  hybe_id: string
  full_name: string | null
  contact: string | null
  is_registered: number | boolean
  created_at: string
}

export function ProfileManager() {
  const [profiles, setProfiles] = useState<AdminProfile[]>([])
  const [newHybeId, setNewHybeId] = useState("")
  const [newDisplayName, setNewDisplayName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    fetchProfiles()
  }, [])

  const fetchProfiles = async () => {
    try {
      const res = await fetch("/api/admin/profiles")
      const json = await res.json()
      setProfiles(json.data || [])
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleAddProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await fetch("/api/admin/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hybe_id: newHybeId, full_name: newDisplayName }),
      })

      setSuccess(`Profile ${newHybeId} added successfully`)
      setNewHybeId("")
      setNewDisplayName("")
      fetchProfiles()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Users className="h-6 w-6" />
        <h1 className="text-2xl font-bold">HYBE Profile Manager</h1>
      </div>

      {/* Add New Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Add New Profile</span>
          </CardTitle>
          <CardDescription>Manually add HYBE IDs and display names for new users</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddProfile} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hybe-id">HYBE ID</Label>
                <Input
                  id="hybe-id"
                  placeholder="e.g., HYBFFF9012345"
                  value={newHybeId}
                  onChange={(e) => setNewHybeId(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="display-name">Display Name</Label>
                <Input
                  id="display-name"
                  placeholder="e.g., Haerin Kang"
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Profiles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Profiles</CardTitle>
          <CardDescription>Manage HYBE user profiles and registration status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>HYBE ID</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-mono">{profile.hybe_id}</TableCell>
                  <TableCell>{profile.full_name || "Not set"}</TableCell>
                  <TableCell>{profile.contact || "Not set"}</TableCell>
                  <TableCell>
                    <Badge variant={(Number(profile.is_registered) === 1 || profile.is_registered) ? "default" : "secondary"}>
                      {(Number(profile.is_registered) === 1 || profile.is_registered) ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" /> Registered
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 mr-1" /> Pending
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(profile.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
