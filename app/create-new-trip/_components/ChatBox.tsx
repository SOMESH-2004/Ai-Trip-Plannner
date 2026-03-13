'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader, Send } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import EmptyBox from './EmptyBox'

type ChatMessage = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

function ChatBox() {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [userInput, setUserInput] = useState<string>('')
    const [isSending, setIsSending] = useState(false)
    const searchParams = useSearchParams()
    const messagesRef = useRef<ChatMessage[]>([])
    const sentInitialRef = useRef(false)

    useEffect(() => {
      messagesRef.current = messages
    }, [messages])
    
    const sendMessage = async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return

      const newMsg: ChatMessage = {
        role: 'user',
        content: trimmed,
      }

      const nextMessages = [...messagesRef.current, newMsg]
      setMessages(nextMessages)
      setUserInput('')

      try {
        setIsSending(true)
        console.log('Sending to /api/Aimodel:', nextMessages)
        const result = await fetch('/api/Aimodel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: nextMessages }),
        })
        const raw = await result.text()
        let data: any = null
        try {
          data = raw ? JSON.parse(raw) : {}
        } catch {
          data = { resp: raw }
        }
        if (!result.ok) {
          const statusLabel = `HTTP ${result.status}`
          throw new Error(data?.error ?? raw ?? statusLabel)
        }

        console.log('AI response:', data)
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data?.resp ?? '',
          },
        ])
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        console.error('AI request failed:', err)
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `Error: ${message}`,
          },
        ])
      } finally {
        setIsSending(false)
      }
    }

    const onSend = async() => {
      await sendMessage(userInput)
    }

    useEffect(() => {
      const initial = searchParams.get('q')
      if (!initial || sentInitialRef.current) return
      sentInitialRef.current = true
      sendMessage(initial)
    }, [searchParams])

  return (
    <div className='h-[93vh] flex flex-col p-5 justify-between '>
      {messages?.length === 0 && 
      <EmptyBox onSelectOption ={(v:string) => {setUserInput(v) ;  onSend()}}/>}
      {/* display msg */}
      <section className='flex flex-col w-full gap-3 p-5 overflow-y-auto'>
        {messages.map((msg, idx) => (
          <div
            key={`${msg.role}-${idx}`}
            className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
          >
            <div
              className={
                msg.role === 'user'
                  ? 'max-w-lg bg-primary text-white px-3 py-2 rounded-2xl'
                  : 'max-w-lg bg-gray-100 text-black px-6 py-2 rounded-2xl'
              }
            >
              <p className='text-sm whitespace-pre-wrap'>{msg.content}</p>
            </div>
          </div>
        ))}
        {isSending && (
          <div className="flex justify-start">
            <div className="max-w-lg bg-gray-100 text-black px-6 py-2 rounded-2xl">
              <Loader className="animate-spin" />
            </div>
          </div>
        )}
      </section>
      {/* user input */}
      <section>
        <div className='flex items-center justify-center'>
        <div className='border rounded-2xl p-1 shadow relative w-[80vh] h-30 '>
          <Textarea 
          className=' h-30  bg-transparent border-none focus-visible:ring-0 shadow-none resize-none text-xs'
          placeholder='create a trip from shen ghat to nagthana'
          onChange={(event) => setUserInput(event.target.value)}
          value={userInput}
          />

          <Button size={'icon'} className='absolute bottom-3 right-3 active:scale-75' onClick={onSend} disabled={isSending}>
            <Send  className='h-4 w-4'/>
          </Button>
        </div>
        </div>
      </section>
    </div>
  )
}

export default ChatBox
