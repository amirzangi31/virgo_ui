import { cva } from "class-variance-authority";
import { PositionType } from '../../types/GlobalType';
import { cn } from "../../utils";
import IconButton from "../ButtonClose/ButtonClose";
import ClientOnlyPortal from "./ClientOnlyPortal";





type ModalVariantsProps = {
      position: PositionType,
}
type ContentVariantsProps = {
      position: PositionType,
}

const ModalVariants: ModalVariantsFunction = cva(
      "fixed inset-0  backdrop-blur-md backdrop-brightness-50 flex z-[11]",
      {

            variants: {

                  position: {
                        "bottom-center": "justify-center items-end md:px-4",
                        "center": "justify-center items-center px-4 ",
                        "top-center": "justify-center items-start md:px-4",
                        "bottom-modal": "justify-center items-end md:justify-center md:items-center md:px-4"
                  }
            },

            defaultVariants: {
                  position: "center"
            },
      }
);

const ContentVariants: ContentVariantsFunction = cva(
      " w-[450px] min-h-[100px] max-w-full  bg-white max-h-[90vh] overflow-y-auto",
      {

            variants: {

                  position: {
                        "bottom-center": "rounded-t-2xl",
                        "center": "rounded-2xl",
                        "top-center": "rounded-b-2xl",
                        "bottom-modal": "rounded-t-2xl md:rounded-2xl"
                  }
            },

            defaultVariants: {
                  position: "center"
            },
      }
);




type ModalProps = ModalVariantsProps & ContentVariantsProps & {
      className?: string;
      children: React.ReactNode;
      onClose: () => void,
      isOpen: boolean
      position?: PositionType,
      isClose?: boolean,
      contentClassName?: string,
      title?: string,
      titleClassName?: string
      closeButtonClassName?: string
}


type ModalVariantsFunction = (props: ModalVariantsProps) => string;
type ContentVariantsFunction = (props: ContentVariantsProps) => string;



export default function Modal({
      isOpen, onClose, children, className, position = "center", isClose = true, contentClassName, title, titleClassName, closeButtonClassName

}: ModalProps) {

      return (
            isOpen && (
                  <ClientOnlyPortal selector="#modal">
                        <div onClick={() => {
                              if (isClose) {
                                    onClose()
                              }
                        }} className={cn(
                              ModalVariants({ position }),
                              "modal_animation",
                              className,
                        )}>
                              <div className={cn(
                                    "",
                                    ContentVariants({ position }),
                                    "content_modal_animation",
                                    contentClassName
                              )}>
                                    <div
                                          className="h-full relative p-4 pt-14 "
                                          onClick={(event) => event.stopPropagation()}
                                    >
                                          {title && <p className={
                                                cn(
                                                      "w-full text-sm font-bold text-primary text-center absolute top-6 left-0  ",
                                                      titleClassName
                                                )
                                          }>{title}</p>}
                                          {isClose && <IconButton svgColor="white" className={cn(
                                                "absolute top-4 left-4 ltr:right-4",
                                                closeButtonClassName
                                          )} onClick={onClose} />}
                                          {children}
                                    </div>
                              </div>
                        </div>
                  </ClientOnlyPortal>
            )
      );
}


