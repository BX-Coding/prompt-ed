"use client"

import * as React from "react"
import { DimensionsIcon, InputIcon, ImageIcon, Pencil1Icon, FaceIcon, AngleIcon, TransparencyGridIcon, BlendingModeIcon, Cross2Icon } from '@radix-ui/react-icons'
import Image from "next/image"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { TabbedSidebar } from "./tabbed-sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./ui/context-menu"
import { DragableInput } from "./dragable-input"
import { DragableTag } from "./dragable-tag"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "./ui/select"

/**
 * WARNING: This file contains untested code - namely Firebase storage code and fetching
 * You will more than likely experience a CORS error with current fetching. next.config
 * will need to be adjusted to allow the server to fetch an image from a remote domain (probably openai).
 * Otherwise, default security will prevent the image urls to load and you will get errors.
 * Please update next.config as appropriate when generative AI features are later added.
 * 
 * In order to add neceassry AI capabilities: change firebaseFunctionUrl variable and uncomment
 * the const urls and setImageURL in the submitHandler function.
 */
export const UITestingGround: React.FC = ({}) => {
    return (
        <>
        <div className="flex flex-1 flex-row justify-start bg-[#F7F7F7]">
            <div className="flex flex-initial flex-col items-center w-150 bg-primary-foreground text-primary pt-4">
                <TabbedSidebar tabs={[
                    {name: "Lesson 1", content:
                        <p className="text-xl font-bold">
                            Welcome to Neural Kingdom
                        </p>},
                    {name: "Lesson 2", content:
                        <p className="text-xl font-bold">
                            Welcome to Neural Kingdom
                        </p>},
                    {name: "Lesson 3", content:
                        <p className="text-xl font-bold">
                            Welcome to Neural Kingdom
                        </p>},
                    {name: "Lesson 4", content:
                        <p className="text-xl font-bold">
                            Welcome to Neural Kingdom
                        </p>},
                    {name: "Lesson 5", content:
                        <p className="text-xl font-bold">
                            Welcome to Neural Kingdom
                        </p>},
                    ]} defaultValue="Lesson 1" />
            </div>
            <div className="p-4 flex-initial space-y-4">
                <Input inputSize="sm" className="w-64" disabled={true} type="text" placeholder="Inputs" />
                <Input inputSize="sm" type="text" placeholder="Inputs" />
                <Input inputSize="default" className="w-64" disabled={true} type="text" placeholder="Inputs" />
                <Input inputSize="default" type="text" placeholder="Inputs" />
                <Input inputSize="lg" className="w-64" disabled={true} type="text" placeholder="Inputs" />
                <Input inputSize="lg" type="text" placeholder="Inputs" />
                <Input inputSize="xl" className="w-64" disabled={true} type="text" placeholder="Inputs" />
                <Input inputSize="xl" type="text" placeholder="Inputs" />
                <div className="flex flex-row space-x-2">
                    <Button size="sm" disabled={true}>Button</Button>
                    <Button size="sm" disabled={true} variant="outline">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="sm">Button</Button>
                    <Button size="sm" variant="outline">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="default" disabled={true}>Button</Button>
                    <Button size="default" disabled={true} variant="outline">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="default">Button</Button>
                    <Button size="default" variant="outline">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="lg" disabled={true}>Button</Button>
                    <Button size="lg" disabled={true} variant="outline">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="lg">Button</Button>
                    <Button size="lg" variant="outline">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="xl" disabled={true}>Button</Button>
                    <Button size="xl" disabled={true} variant="outline">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="xl">Button</Button>
                    <Button size="xl" variant="outline">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="icon" disabled={true}>Button</Button>
                    <Button size="icon" disabled={true} variant="outline">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="icon">Button</Button>
                    <Button size="icon" variant="outline">Button</Button>
                </div>
            </div>
            <div className="p-4 flex-initial space-y-4">
                <Input className="w-64" disabled={true} type="text" placeholder="Inputs" />
                <Input type="text" placeholder="Inputs" />
                <div className="flex flex-row space-x-2">
                    <Button size="sm" disabled={true} variant="accent">Button</Button>
                    <Button size="sm" disabled={true} variant="destructive">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="sm" variant="accent">Button</Button>
                    <Button size="sm" variant="destructive">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="default" disabled={true} variant="accent">Button</Button>
                    <Button size="default" disabled={true} variant="destructive">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="default" variant="accent">Button</Button>
                    <Button size="default" variant="destructive">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="lg" disabled={true} variant="accent">Button</Button>
                    <Button size="lg" disabled={true} variant="destructive">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="lg" variant="accent">Button</Button>
                    <Button size="lg" variant="destructive">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="xl" disabled={true} variant="accent">Button</Button>
                    <Button size="xl" disabled={true} variant="destructive">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="xl" variant="accent">Button</Button>
                    <Button size="xl" variant="destructive">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="icon" disabled={true} variant="accent">Button</Button>
                    <Button size="icon" disabled={true} variant="destructive">Button</Button>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size="icon" variant="accent">Button</Button>
                    <Button size="icon" variant="destructive">Button</Button>
                </div>
            </div>
            <div className="p-4 flex-initial space-y-4">
                <Input className="w-64" disabled={true} type="text" placeholder="Inputs" />
                <Input type="text" placeholder="Inputs" />
                <div className="flex flex-row space-x-2">
                    <Switch size="small" disabled={true} />
                </div>
                <div className="flex flex-row space-x-2">
                    <Switch size="small" />
                </div>
                <div className="flex flex-row space-x-2">
                    <Switch size="default" disabled={true} />
                </div>
                <div className="flex flex-row space-x-2">
                    <Switch size="default" />
                </div>
                <div className="flex flex-row space-x-2">
                    <Switch size="large" disabled={true} />
                </div>
                <div className="flex flex-row space-x-2">
                    <Switch size="large" />
                </div>
                <div className="flex flex-row space-x-2">
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Open</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <span>Profile</span>
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span>Billing</span>
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span>Settings</span>
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span>Keyboard shortcuts</span>
                            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <span>Team</span>
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                            <span>Invite users</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                <span>Email</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                <span>Message</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                <span>More...</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuItem>
                            <span>New Team</span>
                            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                        <span>GitHub</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                        <span>Support</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled>
                        <span>API</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                        <span>Log out</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="bg-accent h-20 w-20 rounded-xl flex items-center justify-center drop-shadow-md">
                        <Image
                            className="animate-bounce"
                            src="/logo-stroke.svg"
                            alt="Logo"
                            width={50}
                            height={50}
                        />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                        <DropdownMenuLabel>Add Block</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex flex-row space-x-1">
                            <InputIcon/><span>Free Input</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex flex-row space-x-1">
                            <DimensionsIcon/> <span>Size</span> 
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex flex-row space-x-1">
                            <BlendingModeIcon/> <span>Color</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex flex-row space-x-1">
                            <ImageIcon/> <span>Genre</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex flex-row space-x-1">
                            <FaceIcon/> <span>Emotion</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex flex-row space-x-1">
                            <Pencil1Icon/><span>Art Style</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex flex-row space-x-1">
                            <AngleIcon/><span>Image Angle</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex flex-row space-x-1">
                            <TransparencyGridIcon/><span>Pattern</span>
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex flex-row space-x-2">
                    <DragableInput initialValue={"test"}/>
                    <DragableTag initialValue={"Option 1"} selectOptions={["Option 1", "Option 2", "Option 3"]}/>
                </div>
                <div className="flex flex-row space-x-2">
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
        </>
    );
}