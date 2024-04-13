import * as React from "react"

import { cn } from "@/lib/utils"
import useMediaQuery from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { BanksChooser } from "./banks-chooser"
import { toast } from "../ui/use-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export function BankUploader() {
  const [open, setOpen] = React.useState(false)
  const [uploadedBanks, setUploadedBanks] = React.useState<string[]>([]);
  const isDesktop = useMediaQuery().isDesktop

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Import File</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Import File</DialogTitle>
            <DialogDescription>
              Export transactions data as a file from bank's website.
            </DialogDescription>
          </DialogHeader>
          <UploadForm banks={uploadedBanks} setBanks={setUploadedBanks} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Import File</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Import File</DrawerTitle>
          <DrawerDescription>
            Export transactions data as a file from bank's website.
          </DrawerDescription>
        </DrawerHeader>
        <UploadForm banks={uploadedBanks} setBanks={setUploadedBanks} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function UploadForm({ className, banks, setBanks }: { className: string, banks: string[], setBanks: React.Dispatch<React.SetStateAction<string[]>> }) {
  const [selectedBank, setSelectedBank] = React.useState<string>("");

  const handleBankSelect = (value: string) => {
    setSelectedBank(value);
  };

  const handleDeleteBank = (index: number) => {
    setBanks(prevBanks => prevBanks.filter((_, i) => i !== index));
  };

  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className={cn("items-center py-4", className)}>
      <BanksChooser onSelect={handleBankSelect} />
      {selectedBank && (
        <div className="mt-4 flex justify-center">
          <Input type="file" placeholder="File" className="mb-2" />
          <Button
            type="submit"
            onClick={() => {
              setBanks(prevBanks => [...prevBanks, selectedBank]);
              toast({
                title: "File uploaded",
                description: "Your file has been uploaded successfully.",
              })
            }}
          >
            Upload
          </Button>
        </div>
      )}

      {banks.length > 0 && (
        <div className="mt-4">
          <h2 className="mb-2 font-bold">Selected Banks:</h2>
          <ul className="space-y-2">
            {banks.map((bank, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{bank}</span>
                <Button variant="destructive" onClick={() => handleDeleteBank(index)}>Delete</Button>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-4">
            <Button
              onClick={() =>
                router.push(
                  "/onboarding" + "?" + createQueryString("step", "done"),
                )
              }
              className="bg-green-500 hover:bg-green-400 h-10 w-32 mt-8"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
