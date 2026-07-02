import { Link } from '@inertiajs/react';
import { FaWhatsapp, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi';

const Footer = () => {
    return (
        <footer className="bg-[#1b1b18] pt-10 pb-10 text-white md:pt-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff9542] p-1">
                                <img
                                    src="/favicon.svg"
                                    alt="Logo"
                                    className="h-full w-auto brightness-0 invert"
                                />
                            </div>
                            <span className="text-2xl font-black tracking-tight text-white">
                                ইচ্ছেঘুড়ি
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-400">
                            আমরা বিশ্বাস করি ভ্রমণ সবার জন্য। সাধ্যের মধ্যে সেরা
                            মানের ট্যুর প্যাকেজ নিয়ে আমরা আছি আপনার পাশে।
                            স্বল্প টাকায় দেশ ও বিদেশ ঘুরে দেখুন আমাদের সাথে।
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://wa.me/8801622347435"
                                target="_blank"
                                rel="noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-[#ff9542]"
                            >
                                <FaWhatsapp className="h-5 w-5" />
                            </a>
                            <a
                                href="https://facebook.com/iccheghuri.tours"
                                target="_blank"
                                rel="noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-[#ff9542]"
                            >
                                <FaFacebookF className="h-5 w-5" />
                            </a>
                            <a
                                href="https://instagram.com/iccheghuri.tours"
                                target="_blank"
                                rel="noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-[#ff9542]"
                            >
                                <FaInstagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links Section */}
                    <div>
                        <h4 className="mb-6 text-lg font-bold">
                            প্রয়োজনীয় লিংক
                        </h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li>
                                <a
                                    href="#"
                                    className="transition-colors hover:text-[#ff9542]"
                                >
                                    আমাদের সম্পর্কে
                                </a>
                            </li>
                            <li>
                                <Link
                                    href="/packages"
                                    className="transition-colors hover:text-[#ff9542]"
                                    rel="noreferrer"
                                >
                                    সব প্যাকেজ
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://www.facebook.com/groups/iccheghuri.community"
                                    className="transition-colors hover:text-[#ff9542]"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    কমিউনিটি
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://maps.app.goo.gl/7WAbKJ4VVrNTGVFq9"
                                    className="transition-colors hover:text-[#ff9542]"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    আমাদের রিভিউ
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h4 className="mb-6 text-lg font-bold">যোগাযোগ</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-center gap-3">
                                <HiLocationMarker className="mt-1 h-5 w-5 shrink-0 text-[#ff9542]" />
                                <span>
                                    অফিস: লালবাগ, জনতা ব্যাংক সংলগ্ন, কে ডি সি
                                    রোড, রংপুর
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <HiPhone className="h-5 w-5 shrink-0 text-[#ff9542]" />
                                <span>01660-160911</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <HiMail className="h-5 w-5 shrink-0 text-[#ff9542]" />
                                <span>support@iccheghuritours.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div>
                        <h4 className="mb-6 text-lg font-bold">নিউজলেটার</h4>
                        <p className="mb-4 text-sm text-gray-400">
                            নতুন অফার ও ট্যুর আপডেট পেতে সাবস্ক্রাইব করুন।
                        </p>
                        <form className="relative">
                            <input
                                type="email"
                                placeholder="আপনার ইমেইল"
                                className="w-full rounded-2xl border-none bg-white/5 px-4 py-3 text-sm focus:ring-2 focus:ring-[#ff9542]"
                            />
                            <button className="absolute top-1 right-1 rounded-xl bg-[#ff9542] px-4 py-2 text-sm font-bold transition-all hover:bg-[#f38630]">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-10 border-t border-white/5 pt-5 text-center md:mt-15 md:pt-10">
                    <p className="text-xs font-medium text-gray-500">
                        &copy; 2026 ইচ্ছেঘুড়ি (Iccheghuri). All Rights
                        Reserved. <br className="sm:hidden" />
                        Developed by
                        <a
                            href="https://tajimz.xyz"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span className="text-orange-400"> Tajim</span>
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
