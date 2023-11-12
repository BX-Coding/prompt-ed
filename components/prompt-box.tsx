"use client"

import update from 'immutability-helper'
import type { FC } from 'react'
import React, { useCallback, useState } from 'react'

import { Buildable, BuildableType, BuildableTypes } from './buildable'

import { BuildableState, usePromptEditorState } from '@/store/editorStore'
import { DragableInput } from './dragable-input'
import { DragableTag } from './dragable-tag'
import { useHasHydrated } from "@/hooks/useHasHydrated"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { BuildableContextMenu } from './buildable-context-menu'

type PromptBoxProps = {
    className?: string
    children?: React.ReactNode[] | React.ReactNode
}


export const PromptBox: FC<PromptBoxProps> = ({ className, children }) => {
    const buildablesZustand = usePromptEditorState((state) => state.buildables)
    const buildables = useHasHydrated() ? buildablesZustand : []
    const setBuildables = usePromptEditorState((state) => state.setBuildables)
    const updateBuildable = usePromptEditorState((state) => state.updateBuildable)

    const moveBuildable = useCallback((dragIndex: number, hoverIndex: number) => {
      setBuildables((prevBuildables: BuildableState[]) =>
        update(prevBuildables, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevBuildables[dragIndex] as BuildableState],
          ],
        }),
      )
    }, [])

    const renderBuildable = useCallback(
      (buildableComponent: BuildableState, index: number) => {
        const value = buildableComponent.value
        return (
          <BuildableContextMenu id={buildableComponent.id}>
            <Buildable
              key={buildableComponent.id}
              index={index}
              id={buildableComponent.id}
              type={BuildableTypes.FREE_INPUT}
              moveCard={moveBuildable}
            > 
              {buildableComponent.type == BuildableTypes.FREE_INPUT ? 
              <DragableInput onChange={(value: string) => {
                updateBuildable(buildableComponent.id, value)
              }} initialValue={value}/> : 
              <DragableTag onChange={(value: string) => {
                updateBuildable(buildableComponent.id, value)
              }} initialValue={buildableComponent.value} selectOptions={buildableComponent.options?.map(option => option.value) ?? []}/>}
            </Buildable>
          </BuildableContextMenu>
        )
      },
      [],
    )

    return (
      <>
        <div className={className + " flex flex-row"}>{buildables.map((card, i) => renderBuildable(card, i))}</div>
      </>
    )
}
