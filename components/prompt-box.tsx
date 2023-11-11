"use client"

import update from 'immutability-helper'
import type { FC } from 'react'
import React, { useCallback, useState } from 'react'

import { Buildable, BuildableType, BuildableTypes } from './buildable'

export interface BuildableElement {
  id: number
  component: React.ReactNode
}

export interface PromtBoxState {
  buildables: BuildableElement[]
}

type PromptBoxProps = {
    className?: string
    children?: React.ReactNode[] | React.ReactNode
}


export const PromptBox: FC<PromptBoxProps> = ({ className, children }) => {
    //Validate children prop
    const childrenArray = React.Children.toArray(children)

    // Convert children to buildables
    const [buildables, setBuildables] = useState<BuildableElement[]>(
        childrenArray.map((child, index) => {
            return {
                id: index,
                component: child,
            }
        }
    ))

    const moveBuildable = useCallback((dragIndex: number, hoverIndex: number) => {
      setBuildables((prevBuildables: BuildableElement[]) =>
        update(prevBuildables, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevBuildables[dragIndex] as BuildableElement],
          ],
        }),
      )
    }, [])

    const renderBuildable = useCallback(
      (buildableComponent: BuildableElement, index: number) => {
        return (
          <Buildable
            key={buildableComponent.id}
            index={index}
            id={buildableComponent.id}
            type={BuildableTypes.FREE_INPUT}
            moveCard={moveBuildable}
          > 
            {buildableComponent.component}
          </Buildable>
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
