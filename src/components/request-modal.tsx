'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { supabase } from '@/lib/supabase'
import { Loader2, CheckCircle2 } from 'lucide-react'

interface RequestModalProps {
  isOpen: boolean
  onClose: () => void
  initialQuery?: string
}

export function RequestModal({ isOpen, onClose, initialQuery = '' }: RequestModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: initialQuery,
    author: '',
    format: 'physical' as 'physical' | 'kindle' | 'audio',
    note: ''
  })

  // Update title if initialQuery changes when opening
  if (initialQuery && formData.title !== initialQuery && !formData.title) {
    setFormData(prev => ({ ...prev, title: initialQuery }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('book_requests')
        .insert({
          book_title: formData.title,
          author: formData.author,
          preferred_format: formData.format,
          note: formData.note,
          status: 'pending'
        })

      if (error) throw error

      setStep('success')
    } catch (error) {
      console.error('Error submitting request:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setStep('form')
    setFormData({
      title: '',
      author: '',
      format: 'physical',
      note: ''
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-bg border-sand">
        {step === 'form' ? (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="font-display text-xl text-ink">Request a Book</DialogTitle>
              <DialogDescription className="font-sans text-stone">
                Can&apos;t find what you&apos;re looking for? Let us know and we&apos;ll try to add it.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="font-sans text-ink">Book Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Atomic Habits"
                  required
                  className="bg-bg2 border-sand focus:border-sage"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="author" className="font-sans text-ink">Author (Optional)</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="e.g. James Clear"
                  className="bg-bg2 border-sand focus:border-sage"
                />
              </div>

              <div className="grid gap-2">
                <Label className="font-sans text-ink">Preferred Format</Label>
                <RadioGroup
                  value={formData.format}
                  onValueChange={(v: any) => setFormData({ ...formData, format: v })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="physical" id="physical" className="border-stone text-sage" />
                    <Label htmlFor="physical" className="font-sans text-stone font-normal">Physical</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kindle" id="kindle" className="border-stone text-sage" />
                    <Label htmlFor="kindle" className="font-sans text-stone font-normal">Kindle</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="audio" id="audio" className="border-stone text-sage" />
                    <Label htmlFor="audio" className="font-sans text-stone font-normal">Audio</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="note" className="font-sans text-ink">Note (Optional)</Label>
                <Textarea
                  id="note"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="Any specific edition or reason?"
                  className="bg-bg2 border-sand focus:border-sage resize-none"
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose} className="border-sand text-stone hover:bg-bg2 hover:text-ink">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-sage hover:bg-sage/90 text-white">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Request Book'
                )}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-sage" />
            </div>
            <h3 className="font-display text-xl text-ink mb-2">Request Received</h3>
            <p className="font-sans text-stone mb-6 max-w-[260px]">
              Thank you! We&apos;ve added your request to our review list.
            </p>
            <Button onClick={handleClose} className="bg-sage hover:bg-sage/90 text-white">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
